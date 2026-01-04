import { BsGithub } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className='border-t border-gray-200 py-8 dark:border-gray-800 md:py-12'>
      <div className='mx-auto max-w-6xl px-6 md:px-12 lg:px-16'>
        <div className='flex flex-col items-center justify-between gap-4 text-sm font-light text-gray-500 dark:text-gray-400 md:flex-row'>
          <p>© {new Date().getFullYear()} Milan Bako</p>
          <div className='flex items-center gap-2'>
            <span>View source on</span>
            <a
              href='https://github.com/mlnbk/mlnbk_portfolio'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-colors hover:text-gray-900 dark:hover:text-gray-200'
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
