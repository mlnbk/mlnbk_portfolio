const About = () => {
  return (
    <div className="grid grid-cols-[20%_auto] grid-rows-1 gap-16 items-center p-8 text-white">
      <div className="flex items-center justify-center w-48 h-48 rounded-full bg-gray-500 border-4 border-blue-900 justify-self-center">
        <img
          src="avatar.jpg"
          alt="Avatar"
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="justify-self-start self-start text-start">
        <h2 className="text-4xl font-bold mb-4">Hi there 👋</h2>
        <p className="text-lg">I'm a Full-Stack Software Engineer.</p>
      </div>
    </div>
  );
};

export default About;
