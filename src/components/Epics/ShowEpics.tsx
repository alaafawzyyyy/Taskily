'use client';
import { useEffect, useRef, useState } from 'react';
import { Epic, EpicCard } from './EpicCard';
import { useParams, useRouter } from 'next/navigation';
import { GetEpicDetails, GetEpics, UpdateEpic } from '../lib/api/epics';
import { ProjectErrorPage } from '../ProjectErrorPage';
import { NoProjects } from '../NoProjects';
import Image from 'next/image';
import noepics from '../../../public/assets/icons/noepics.svg';
import createepic from '../../../public/assets/icons/createepic.svg';
import hierarchy from '../../../public/assets/icons/hierarchy.svg';
import velocity from '../../../public/assets/icons/velocity.svg';
import highgoals from '../../../public/assets/icons/highgoals.svg';
import plus from '../../../public/assets/icons/plus.svg';
import { ShowEpicsHeader } from './ShowEpicsHeader';
import { SkeletonEpics } from './SkeletonEpics';
import ProjectFooter from '../showProjects/ProjectsFooter';
import Link from 'next/link';
import { Pop, PopUp } from './PopUP';
import toast from 'react-hot-toast';

const footerDate = [
  {
    img: highgoals,
    title: 'High-Level Goals',
    message: 'Define the broad objectives that span across multiple cycles.',
  },

  {
    img: hierarchy,
    title: 'Hierarchy Design',
    message: 'Link individual tasks to parent epics for a consolidated view.',
  },

  {
    img: velocity,
    title: 'Track Velocity',
    message: 'Visualize percentage completion at a macro project level.',
  },
];
export type UpdateEpicFields = Partial<{
  title: string;
  description?: string;
  assignee_id: string | null;
  deadline: string | null;
  assignee: {
    name: string;
    sub: string;
  } | null;
}>;

export function ShowEpics() {
  const [epics, setEpics] = useState<Epic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedEpicId, setSelectedEpicId] = useState<string | null>(null);
  const [selectedEpic, setSelectedEpic] = useState<Pop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modeForm, setModeForm] = useState<'description' | 'edit'>();
  const [isSaving, setIsSaving] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const limit = 6;
  const router = useRouter();
  const params = useParams();
  const projectId =
    typeof params.projectId === 'string' ? params.projectId : undefined;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // handle update
  const handleUpdate = async <K extends keyof UpdateEpicFields>(
    field: K,
    value: UpdateEpicFields[K],
    extraData?: Partial<UpdateEpicFields>,
  ) => {
    if (!selectedEpicId || !selectedEpic) return;
    const prevState = selectedEpic;

    const prevValue = selectedEpic[field as keyof typeof selectedEpic];
    if (prevValue === value) return;

    const updated: Pop = {
      ...selectedEpic,
      [field]: value,
      ...(extraData || {}),
    };

    setSelectedEpic(updated);

    setEpics((prev) =>
      prev.map((epic) =>
        epic.id === selectedEpicId ? { ...epic, ...updated } : epic,
      ),
    );

    try {
      setIsSaving(true);

      const res = await UpdateEpic({
        selectedEpicId,
        data: { [field]: value },
      });

      if (!res.ok) throw new Error();
      toast.success('Updated');
    } catch {
      toast.error('Failed to update epic. Please try again.');
      setSelectedEpic(prevState);
    } finally {
      setIsSaving(false);
    }
  };

  // fetch details
  const fetchDetails = async () => {
    if (!projectId || !selectedEpicId) return;
    const data = await GetEpicDetails({ projectId, selectedEpicId });
    setSelectedEpic(data);
    console.log(data);
  };

  // fetch data for epic details
  useEffect(() => {
    if (isModalOpen) {
      fetchDetails();
    }
  }, [isModalOpen, selectedEpicId]);

  // fetch epics
  const fetchEpics = async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      setError(false);

      const offset = (currentPage - 1) * limit;
      const res = await GetEpics({
        projectId,
        limit,
        offset,
        search: debouncedSearch,
      });
      const contentRange = res.res?.headers.get('content-range');

      let totall: number = 0;

      if (contentRange) {
        totall = Number(contentRange.split('/')[1]);
        setTotal(totall);
      }

      if (res.status === 401) {
        router.push('/login');
        return;
      } else if (res.ok && res.data) {
        const data = res.data;

        if (isMobile) {
          if (currentPage === 1) {
            setEpics(data);
          } else {
            setEpics((prev) => [...prev, ...data]);
          }
        } else {
          setEpics(data);
        }
      } else {
        setError(true);
        console.log(res.error);
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages: number = Math.ceil(total / limit);

  useEffect(() => {
    fetchEpics();
  }, [projectId, currentPage, debouncedSearch]);

  useEffect(() => {
    if (!projectId) return;

    setCurrentPage(1);
  }, [debouncedSearch, projectId]);

  // reset epics
  const clearSearch = () => {
    setSearch('');
    setDebouncedSearch('');
    setCurrentPage(1);
  };

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

      if (entry.isIntersecting && !isLoading && currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentPage, isLoading, totalPages, isMobile]);

  if (isLoading) {
    return <SkeletonEpics />;
  } else if (error) {
    return (
      <ProjectErrorPage
        retry={fetchEpics}
        message="We're having trouble retrieving your project epics right now. Please try again in a moment."
      />
    );
  }
  return epics.length === 0 && !isLoading ? (
    debouncedSearch ? (
      <div className="flex items-center justify-between flex-col gap-6">
        <p className="text-center mt-10 text-gray-500">
          No epics found matching your search
        </p>
        <button
          onClick={() => {
            setSearch('');
            setDebouncedSearch('');
            setCurrentPage(1);
          }}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Show all epics
        </button>
      </div>
    ) : (
      <div className="flex flex-col gap-16 items-center">
        <Link href={`/project/${projectId}/epics/new`}>
          <NoProjects
            image={noepics}
            title="No epics in this project yet."
            message="Break down your large project into manageable epics to track progress better and maintain architectural clarity."
            button="Create First Epic"
            buttonimage={createepic}
          />
        </Link>
        <div className="flex gap-6 w-672 ">
          {footerDate.slice(0, limit).map((data, id) => (
            <div
              key={id}
              className="bg-surface-low p-4 rounded-lg border flex flex-col gap-1"
            >
              <Image
                src={data.img}
                alt={data.img}
              />
              <p className="text-slate-900 font-semibold text-base leading-6">
                {data.title}
              </p>
              <p className="text-xs leading-5 text-mid">{data.message} </p>
            </div>
          ))}
        </div>
      </div>
    )
  ) : (
    <div className="w-full max-w-1024 flex flex-col h-full md:gap-16 gap-6 px-3">
      <ShowEpicsHeader
        projectId={projectId}
        onSearch={setSearch}
        search={search}
        onClear={clearSearch}
      />
      <div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-3 gap-6 mb-24 md:mb-0">
        {epics?.map((epic) => (
          <div
            key={epic.id}
            className="cursor-pointer"
            onClick={() => {
              setSelectedEpicId(epic.id);
              setIsModalOpen(true);
              setModeForm('description');
            }}
          >
            <EpicCard
              data={epic}
              onEdit={() => {
                setModeForm('edit');
                setSelectedEpicId(epic.id);
                setIsModalOpen(true);
              }}
            />
          </div>
        ))}
      </div>
      <ProjectFooter
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
      />
      <Link
        href={`/project/${projectId}/epics/new`}
        className="fixed bottom-20 right-6 md:hidden z-50"
      >
        <div className="md:hidden flex justify-center rounded-xl items-center w-14 h-14 bg-gradient-to-b from-primary to-primary-container">
          <Image
            src={plus}
            alt="plus icon"
          />
        </div>
      </Link>
      <div className="block md:hidden">
        <div ref={loadMoreRef}></div>
      </div>
      <PopUp
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        selectedEpic={selectedEpic}
        setIsModalOpen={setIsModalOpen}
        modeForm={modeForm}
        handleUpdate={handleUpdate}
        isSaving={isSaving}
        projectId={projectId}
      />
    </div>
  );
}
