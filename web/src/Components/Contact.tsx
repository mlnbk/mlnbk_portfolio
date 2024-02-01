import { FC } from 'react';
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { Link } from 'react-router-dom';

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
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => console.log(data);

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
          text-xl md:text-2xl lg:text-3xl 2xl:text-4xl
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
          className="
            w-min mx-auto
            bg-blue-800 font-medium
            py-2 px-4 md:px-6 lg:px-8
            rounded-lg shadow-lg
            transition-all duration-200 ease-in-out
            border-2 border-transparent
            hover:bg-blue-700 hover:border-blue-500 hover:cursor-pointer
          "
        >
          Submit
        </button>
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
