import { Link } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 w-full text-sm text-gray-500 text-center p-4 pt-6">
      <p>
        2024
        {' | '}
        <a
          href="https://github.com/mlnbk"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          mlnbk
        </a>
      </p>
      <div className="flex items-center justify-center">
        This project is available on
        <Link to="https://github.com/mlnbk/mlnbk_portfolio">
          <BsGithub size={20} className="ml-2" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
