import { BsGithub } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-light">
          <p>© {new Date().getFullYear()} Milan Bako</p>
          <div className="flex items-center gap-2">
            <span>View source on</span>
            <a
              href="https://github.com/mlnbk/mlnbk_portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              <BsGithub size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
