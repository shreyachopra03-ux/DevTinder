import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { deleteUser } from '../slices/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useState } from 'react';

interface RootState {
  user: {
    _id: string;
    firstName: string;
    photoUrl?: string;
  } | null;
}

const navLinks = [
  { path: '/feed', label: 'Feed' },
  { path: '/connections', label: 'Connections' },
  { path: '/requests', label: 'Requests' },
];

export default function NavBar() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(deleteUser());
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="h-16 px-4 sm:px-6 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between sticky top-0 z-50">
      <Link to={user ? '/feed' : '/login'} className="flex items-center gap-2 shrink-0">
        <span className="text-xl font-black tracking-tight text-slate-900">
          DEV<span className="text-violet-600">TINDER</span>
        </span>
      </Link>

      {user ? (
        <>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition ${
                  isActive(link.path)
                    ? 'bg-violet-50 text-violet-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className={`hidden sm:block text-sm font-medium transition px-4 py-2 rounded-xl ${
                isActive('/profile')
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Profile
            </Link>

            <div className="group relative">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200 hover:border-violet-400 transition flex items-center justify-center bg-slate-100 cursor-pointer"
              >
                <img
                  src={user.photoUrl || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </button>

              <div className="absolute right-0 top-10 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 hidden group-hover:block">
                <div className="px-4 py-2 border-b border-slate-50">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-800 truncate">{user.firstName}</p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium transition"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {mobileOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-lg md:hidden animate-fade-in">
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-xl transition ${
                      isActive(link.path)
                        ? 'bg-violet-50 text-violet-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition ${
                    isActive('/profile')
                      ? 'bg-violet-50 text-violet-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Profile
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          to="/login"
          className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-600/15 transition"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
