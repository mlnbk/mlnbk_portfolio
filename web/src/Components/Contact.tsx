import { FC, useState } from 'react';
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

import Input from './Input';
import { useSendEmail } from '../Hooks/useSendEmail';

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
    <section className="space-y-12">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
          Get in Touch
        </h2>
        <p className="text-base md:text-lg text-gray-600 font-light">
          Interested in working together? I'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/milan-bako"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BsLinkedin size={24} />
              </a>
              <a
                href="https://github.com/mlnbk/mlnbk_portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BsGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            name={'name'}
            register={register as unknown as UseFormRegister<FieldValues>}
            registerOptions={{ required: true }}
            placeholder={'Name'}
            error={errors.name && 'This field is required.'}
          />
          <Input
            name={'email'}
            register={register as unknown as UseFormRegister<FieldValues>}
            registerOptions={{
              required: true,
              pattern: /^\S+@\S+$/i,
            }}
            placeholder={'Email'}
            error={
              errors.email &&
              'This field is required and should be a valid email.'
            }
          />
          <Input
            name="message"
            register={register as unknown as UseFormRegister<FieldValues>}
            registerOptions={{ required: true }}
            placeholder={'Message'}
            textarea
            error={errors.message && 'This field is required.'}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="
              px-8 py-3
              bg-gray-900 text-white
              font-light text-sm uppercase tracking-wider
              hover:bg-gray-800
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {successText && (
            <p className="text-sm text-gray-600">{successText}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
