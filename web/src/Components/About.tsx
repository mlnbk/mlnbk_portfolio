const About = () => {
  return (
    <div className="grid grid-cols-[20%_auto] grid-rows-1 gap-10 lg:gap-16 items-center p-10 text-white">
      <div className="flex items-center justify-center w-28 h-28 md:w-48 md:h-48 lg:w-54 lg:h-54 rounded-full bg-gray-500 border-4 border-indigo-950 justify-self-center">
        <img
          src="avatar.jpeg"
          alt="Avatar"
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="justify-self-start self-center text-start">
        <h2 className="text-4xl font-bold mb-4">Hi, I'm Milan 👋</h2>
        <p className="text-lg">
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
