import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { Link } from "react-router-dom";

interface ConnectedUser {
  _id: string;
  firstName: string;
  lastName?: string;
  age: number;
  gender: string;
  photoUrl: string;
  skills: string[];
  about: string;
}

const Connections = () => {
  const [connections, setConnections] = useState<ConnectedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
        setConnections(res.data.data || []);
      } catch (err) {
        console.error("Error fetching connections:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center gap-3 py-20">
          <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500">Loading connections...</p>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center w-full animate-fade-in-up">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-10 max-w-sm mx-auto text-center">
          <div className="text-6xl mb-4">🤝</div>
          <h3 className="text-lg font-bold text-slate-900">No Connections Yet</h3>
          <p className="text-sm text-slate-500 mt-2">Start swiping on the feed to connect with other devs!</p>
          <Link to="/feed" className="inline-block mt-5 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-lg transition">
            Browse Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        Your Connections
        <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">{connections.length}</span>
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {connections.map((user) => (
          <div key={user._id} className="bg-white border border-slate-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex items-center gap-4 card-hover">
            <img
              src={user.photoUrl || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
              alt={user.firstName}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"; }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate">
                {user.firstName} {user.lastName || ""}
                <span className="text-slate-400 font-normal ml-1">{user.age}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{(user.gender || "").charAt(0).toUpperCase() + (user.gender || "").slice(1)}</p>
              <p className="text-xs text-slate-400 truncate mt-0.5">{user.about}</p>
              {user.skills && user.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {user.skills.slice(0, 3).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-violet-50 text-violet-600 text-[10px] font-semibold rounded-md">{s}</span>
                  ))}
                  {user.skills.length > 3 && <span className="text-[10px] text-slate-400">+{user.skills.length - 3}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
