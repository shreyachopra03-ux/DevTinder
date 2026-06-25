import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-100 bg-white px-5 py-8 text-slate-500 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <Link to="/" className="text-sm font-bold tracking-tight text-slate-900">
          DEV<span className="text-violet-600">TINDER</span>
        </Link>
        <p className="text-xs">&copy; {new Date().getFullYear()} DevTinder. All rights reserved.</p>
        <div className="flex gap-4 text-xs">
          <span className="hover:text-slate-700 transition cursor-default">Privacy</span>
          <span className="hover:text-slate-700 transition cursor-default">Terms</span>
          <span className="hover:text-slate-700 transition cursor-default">Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
