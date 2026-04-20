'use client';
import Image from 'next/image';
import right from '../../../public/assets/icons/right.svg';
import errormark from '../../../public/assets/icons/errormark.svg';
import protip from '../../../public/assets/icons/protip .svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import z from 'zod';

// React Form Hook and Validation
const addProjectSchema = z.object({
  name: z
    .string()
    .min(3, 'Project name must be at least 3 characters.')
    .max(100, 'Project name must be less than 100 characters.'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 character')
    .optional(),
});

type formType = z.infer<typeof addProjectSchema>;

export function AddProjectForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formType>({ resolver: zodResolver(addProjectSchema) });

  const description = useWatch({
    control,
    name: 'description',
    defaultValue: '',
  });
  const descriptionLength = (description ?? '').length;

  const submitForm = async (data: formType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col md:top-[60px] md:left-[32px] rounded-2 md:p-4 relative md:items-center px-6 pt-8 pb-[80px] md:max-w-[960px] w-full"
    >
      <div className="flex flex-col md:rounded-2 md:bg-white w-full md:max-w-[672px] ">
        {/* Form Header */}
        <div className="md:border-b pb-10 md:px-8 pt-8 md:border-[#F1F3FF]">
          <div className="flex gap-4 h-[52px] items-start">
            <div className="hidden md:block bg-[#0052CC1A] rounded-[4px] p-3 ">
              <Image
                src={right}
                alt="initalize new project icon"
                className="w-[22px] "
              />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-[24px] leading-8 text-[#041B3C] capitalize">
                initialize new project
              </p>
              <p className="text-[14px] leading-5 text-[#041B3C] capitalize">
                Define the scope and foundational details of your project
              </p>
            </div>
          </div>
        </div>

        {/*Form Content */}
        <div className="flex flex-col md:p-8 gap-8">
          {/* Project title */}
          <div className="flex flex-col gap-2">
            <p className="font-bold text-[11px] leading-[16.5px] tracking-[0.55px] uppercase text-[#4F5F7B]">
              project title *
            </p>
            <input
              type="text"
              {...register('name')}
              className="rounded-[4px] py-3 px-4 bg-[#D7E2FF] border-2 border-[#000000]"
            />
            <p className=" flex gap-1 text-[12px] font-medium leading-4 text-[#BA1A1A]">
              {errors.name ? (
                <Image
                  src={errormark}
                  alt="Error mark"
                />
              ) : (
                ''
              )}
              {errors.name?.message}
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <p className="font-bold text-[11px] text-[#4F5F7B] leading-[16.5px] tracking-[0.55px] uppercase flex justify-between">
              description
              <span className="hidden md:block text-[11px] leading-[16.5px] text-[#4F5F7B99] capitalize">
                Optional
              </span>
            </p>
            <textarea
              className="rounded-[4px] pt-3 pb-[84px] px-4 bg-[#D7E2FF] border-2 border-[#000000] placeholder: text-[16px] text-[#4F5F7B] leading-6 "
              placeholder="Provide a high-level overview of the project's architectural
               objectives and key milestones..."
              {...register('description')}
              maxLength={500}
            />
            <div className="flex justify-between">
              <p className=" flex gap-1 text-[12px] font-medium leading-4 text-[#BA1A1A]">
                {errors.description ? (
                  <Image
                    src={errormark}
                    alt="Error mark"
                  />
                ) : (
                  ''
                )}
                {errors.description?.message}
              </p>
              <p className="text-end text-[11px] font-medium text-[#4F5F7B] leading-[16.5px]">
                {descriptionLength} / 500 character
              </p>
            </div>
          </div>

          {/* Cancel && Create */}
          <div className="flex-col md:flex-row flex justify-between md:py-4 pt-4 gap-1">
            <button className="order-2 rounded-[8px] md:rounded-[4px] py-3 px-6 text-[14px] font-bold leading-5 text-[#4F5F7B] ">
              Cancel
            </button>
            <button className="order-1 rounded-[8px] md:rounded-[4px] py-4 md:py-3 px-6 md:px-8 text-[14px] font-bold leading-5 text-white bg-gradient-to-b from-[#003D9B] to-[#0052CC]">
              Create Project
            </button>
          </div>
        </div>
        {/* Footer Pro Tip */}
        <div className="flex pt-12 md:p-6 gap-3 md:bg-[#F1F3FF]">
          <Image
            src={protip}
            alt="Pro tip icon"
            className="hidden md:block"
          />
          <p className="text-[12px] leading-[19.5px] text-[#4F5F7B]">
            <span className="block md:inline text-[12px] font-bold ">
              Pro Tip:{' '}
            </span>{' '}
            You can invite project members and assign epics immediately after
            the initial creation process.
          </p>
        </div>
      </div>
    </form>
  );
}
