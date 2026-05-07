'use client';
import { useEffect, useRef, useState } from 'react';
import { TaskListCard } from './TaskListCard';
import { GetTasks } from '../lib/api/tasks';
import { TaskCard } from './TaskCard';
import { useParams } from 'next/navigation';
import ProjectFooter from '../showProjects/ProjectsFooter';

type Props = {
  onSelectTask: (id: string) => void;
  search: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export function ListView({
  onSelectTask,
  search,
  currentPage,
  setCurrentPage,
}: Props) {
  const [tasks, setTasks] = useState<TaskCard[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const limit = 5;
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : undefined;

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) return;

      try {
        const offset = (currentPage - 1) * limit;

        const res = await GetTasks({
          projectId,
          offset,
          limit,
          search,
        });
        const contentRange = res.res?.headers.get('content-range');
        let totall: number = 0;

        if (contentRange) {
          totall = Number(contentRange.split('/')[1]);
          setTotal(totall);
        }

        if (res.ok) {
          const newData: TaskCard[] = (res.data || []).map((t) => ({
            id: t.id,
            task_id: t.task_id,
            title: t.title,
            status: t.status ?? 'TO_DO',
            due_date: t.due_date ?? '',
            assignee: {
              name: t.assignee?.name ?? 'Unassigned',
            },
          }));
          if (isMobile) {
            if (currentPage === 1) {
              setTasks(newData);
            } else {
              setTasks((prev) => [...prev, ...newData]);
            }
          } else {
            setTasks(newData);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [projectId, currentPage, search]);
  const totalPages: number = Math.ceil(total / limit);

  // checking mobile to activate the infinite scroll
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');

    const handleChange = () => setIsMobile(media.matches);

    handleChange();
    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, []);

  // checking the element for fetching new pages in infinite scrolling
  useEffect(() => {
    if (!isMobile) return;

    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentPage, totalPages, isMobile]);

  return (
    <div className="pb-6 hidden md:block">
      <div className="px-4 py-3 rounded-lg grid grid-cols-7 items-center">
        <p className="text-xs uppercase text-text-mid">task id</p>
        <p className="col-span-2 text-xs uppercase text-text-mid">title</p>
        <p className="text-xs uppercase text-text-mid">status</p>
        <p className="text-xs uppercase text-text-mid">due date</p>
        <p className="text-xs uppercase text-text-mid">assignee</p>
        <p></p>
      </div>

      {/* Tasks */}
      <TaskListCard
        tasks={tasks}
        onTaskClick={(id) => onSelectTask(id)}
      />
      {/* footer */}
      <div>
        <ProjectFooter
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          total={total}
        />
      </div>
    </div>
  );
}
