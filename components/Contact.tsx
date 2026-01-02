'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

import { useSendEmail } from '@Hooks/useSendEmail';

import Input from './Input';

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const [successText, setSuccessText] = useState<string>();
  const { sendEmail, isLoading, error } = useSendEmail();
  const onSubmit = async (data: Inputs) => {
    setSuccessText('');
    const response = await sendEmail(data);
    if (response) {
      setSuccessText(response);
      reset();
    }
  };

  return (
    <section className='space-y-12'>
      <div className='grid gap-12 md:grid-cols-2 md:gap-16'>
        <div className='space-y-8'>
          <div className='max-w-2xl'>
            <h2 className='mb-4 text-3xl font-light text-gray-900 md:text-4xl'>Get in Touch</h2>
            <p className='text-base font-light text-gray-600 md:text-lg'>
              Interested in working together? I'd love to hear from you.
            </p>
          </div>
          <div>
            <h3 className='mb-4 text-sm font-medium uppercase tracking-wider text-gray-500'>
              Connect
            </h3>
            <div className='flex gap-6'>
              <a
                href='https://www.linkedin.com/in/milan-bako'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-gray-900'
              >
                <BsLinkedin size={24} />
              </a>
              <a
                href='https://github.com/mlnbk'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-gray-900'
              >
                <BsGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <Input
            name={'name'}
            register={register}
            registerOptions={{ required: true }}
            placeholder={'Name'}
            error={errors.name ? 'This field is required.' : undefined}
          />
          <Input
            name={'email'}
            register={register}
            registerOptions={{
              required: true,
              pattern: /^\S+@\S+$/i,
            }}
            placeholder={'Email'}
            error={errors.email ? 'This field is required and should be a valid email.' : undefined}
          />
          <Input
            name='message'
            register={register}
            registerOptions={{ required: true }}
            placeholder={'Message'}
            textarea
            error={errors.message ? 'This field is required.' : undefined}
          />
          <button
            type='submit'
            disabled={isLoading}
            className='
              bg-gray-900 px-8
              py-3 text-sm
              font-light uppercase tracking-wider text-white
              transition-colors
              duration-200 hover:bg-gray-800
              disabled:cursor-not-allowed disabled:opacity-50
            '
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
          {error && <p className='text-sm text-red-600'>{error}</p>}
          {successText && <p className='text-sm text-gray-600'>{successText}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
