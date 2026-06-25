import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center w-full animate-fade-in-up">
      <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-10 max-w-sm mx-auto text-center">
        <div className="text-6xl mb-4">404</div>
        <h3 className="text-lg font-bold text-slate-900">Page Not Found</h3>
        <p className="text-sm text-slate-500 mt-2">The page you're looking for doesn't exist.</p>
        <Link to="/feed" className="inline-block mt-5 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-lg transition">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
