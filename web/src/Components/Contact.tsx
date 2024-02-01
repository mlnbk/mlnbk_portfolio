import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

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
        <input {...register('name', { required: true })} placeholder="Name" />
        {errors.name && <span>This field is required</span>}

        <input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="Email"
        />
        {errors.email && (
          <span>This field is required and should be a valid email</span>
        )}

        <textarea
          {...register('message', { required: true })}
          placeholder="Message"
        />
        {errors.message && <span>This field is required</span>}

        <input type="submit" />
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
        <div className="flex gap-4 justify-center">
          <BsLinkedin size={32} />
          <BsGithub size={32} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
