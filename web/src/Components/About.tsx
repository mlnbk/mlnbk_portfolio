const About = () => {
  return (
    <div className="grid grid-cols-[30%_auto] gap-6 md:gap-8 items-center px-4 md:p-0 text-white">
      <div className="flex items-center justify-center w-28 h-28 md:w-48 md:h-48 lg:w-54 lg:h-54 rounded-full bg-gray-500 border-4 border-indigo-950 justify-self-center">
        <img
          src="avatar.jpeg"
          alt="Avatar"
          className="w-full h-full rounded-full"
        />
      </div>
      <h2 className="md:hidden text-start text-2xl md:text-3xl text-3xl font-bold mb-4">
        Hi, I'm Milan 👋
      </h2>
      <div className="md:row-start-1 md:col-start-2 col-start-1 col-span-2">
        <h2 className="hidden md:block text-start text-2xl md:text-3xl text-3xl font-bold mb-4">
          Hi, I'm Milan 👋
        </h2>
        <p className="text-start text-lg text-justify">
          An experienced full-stack software engineer, all about getting things
          done effectively and efficiently. Being highly detail-oriented, I
          bring reliability to every project. I'm flexible, consistently seeking
          ways to enhance my skills and adapt to new technologies, with that
          ensuring that I deliver exceptional results.
        </p>
      </div>
    </div>
  );
};

export default About;
