import { FC, useState } from 'react';
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { Link } from 'react-router-dom';

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
    setSuccessText(response);
    reset();
  };

  return (
    <div
      className="
        grid grid-flow-row md:grid-flow-col md:grid-cols-5 gap-6 md:gap-8
        px-4 md:p-0
        text-white text-left
      "
    >
      <div
        className="
          my-auto md:row-span-2 md:col-span-2
          text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl
        "
      >
        <h2 className="font-medium">
          Let's do <br className="hidden md:block" />
          <span className="font-bold">great together</span>
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          text-center
          grid grid-flow-row gap-4
          md:col-start-3 md:col-span-3
        "
      >
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
          className={`
            w-min mx-auto
            bg-blue-800 font-medium
            py-1 px-2 md:px-4 
            rounded-lg shadow-lg
            transition-all duration-200 ease-in-out
            border-2 border-transparent
            hover:bg-blue-700 hover:border-blue-500 hover:cursor-pointer
            disabled:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-transparent
          `}
        >
          {isLoading ? 'Sending...' : 'Submit'}
        </button>
        {error && <span className="text-sm text-red-500">{error}</span>}
        {successText}
      </form>

      <div
        className="
          flex flex-col gap-4
          md:col-start-3 md:col-span-3
          text-center
        "
      >
        <div className="flex items-center relative">
          <div className="flex-1">
            <hr />
          </div>
          <div className="px-2">Or find me on</div>
          <div className="flex-1">
            <hr />
          </div>
        </div>
        <div className="flex gap-8 justify-center">
          <Link to="https://www.linkedin.com/in/milan-bako">
            <BsLinkedin size={24} />
          </Link>
          <Link to="https://github.com/mlnbk/mlnbk_portfolio">
            <BsGithub size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
