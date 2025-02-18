import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2">
      {/* Left section - Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </Link>
      </div>

      {/* Center section - Navigation Items */}
      <div className="flex-grow flex justify-center space-x-6">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/projects" className="nav-link">Projects</Link>
        {/* ... other nav items ... */}
      </div>

      {/* Right section - Contact Icons */}
      <div className="flex items-center space-x-4">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-6 h-6" />
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="w-6 h-6" />
        </a>
        <a href="mailto:your@email.com">
          <FaEnvelope className="w-6 h-6" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar; 