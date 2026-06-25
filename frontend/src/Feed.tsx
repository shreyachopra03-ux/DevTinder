import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { Link } from "react-router-dom";

interface DeveloperProfile {
  _id: string;
  firstName: string;
  lastName?: string;
  age: number;
  gender: string;
  photoUrl: string;
  skills: string[];
  about: string;
}

const Feed = () => {
  const [feedData, setFeedData] = useState<DeveloperProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      setFeedData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleAction = async (status: "ignored" | "interested", toUserId: string) => {
    setActionLoading(true);
    setDirection(status === "interested" ? "right" : "left");
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${toUserId}`, {}, { withCredentials: true });
      setTimeout(() => {
        setFeedData((prev) => prev.filter((p) => p._id !== toUserId));
        setDirection(null);
        setActionLoading(false);
      }, 300);
    } catch (err) {
      console.error(`Failed to send request:`, err);
      setDirection(null);
      setActionLoading(false);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!feedData.length || actionLoading) return;
    const currentDev = feedData[0];
    if (!currentDev) return;
    if (e.key === "ArrowLeft") handleAction("ignored", currentDev._id);
    if (e.key === "ArrowRight") handleAction("interested", currentDev._id);
  }, [feedData, actionLoading]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (loading) {
    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center gap-3 py-20">
          <div className="w-12 h-12 border-[3px] border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500 tracking-wide">Finding matching devs...</p>
        </div>
      </div>
    );
  }

  if (feedData.length === 0) {
    return (
      <div className="flex justify-center w-full animate-fade-in-up">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-10 max-w-sm mx-auto text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-slate-900">End of Stack</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            No new developers found. Check back later or{" "}
            <Link to="/profile" className="text-violet-600 font-semibold hover:underline">update your profile</Link>
            {" "} to get better matches!
          </p>
          <button onClick={fetchFeed} className="mt-6 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-lg transition cursor-pointer">
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  const currentDev = feedData[0];

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-md mx-auto">
        <div
          className={`bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            direction === "left" ? "animate-slide-out-left opacity-0" : direction === "right" ? "animate-slide-in-right" : "animate-fade-in-up"
          }`}
        >
          <div className="relative h-96 w-full bg-slate-900">
            <img
              src={currentDev.photoUrl}
              alt="avatar"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl font-bold">{currentDev.firstName} {currentDev.lastName || ""}</h2>
                <span className="text-lg font-medium text-slate-300">{currentDev.age}</span>
              </div>
              <p className="text-sm text-violet-400 capitalize font-medium mt-1">{currentDev.gender}</p>
            </div>
            {direction === "right" && (
              <div className="absolute top-6 right-6 rotate-12 bg-emerald-500 text-white text-lg font-bold px-4 py-1.5 rounded-xl shadow-lg border-2 border-white">
                MATCH!
              </div>
            )}
            {direction === "left" && (
              <div className="absolute top-6 left-6 -rotate-12 bg-rose-500 text-white text-lg font-bold px-4 py-1.5 rounded-xl shadow-lg border-2 border-white">
                PASS
              </div>
            )}
          </div>

          <div className="p-6 space-y-5">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">About</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{currentDev.about}</p>
            </div>

            {currentDev.skills && currentDev.skills.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentDev.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-violet-50 text-violet-600 text-xs font-semibold rounded-lg border border-violet-100/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => handleAction("ignored", currentDev._id)}
                disabled={actionLoading}
                className="py-3.5 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-semibold rounded-2xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="text-lg">✕</span> Pass
              </button>
              <button
                onClick={() => handleAction("interested", currentDev._id)}
                disabled={actionLoading}
                className="py-3.5 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold rounded-2xl shadow-lg shadow-violet-600/15 transition cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="text-lg">♥</span> Connect
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          {feedData.length} profile{feedData.length !== 1 ? "s" : ""} remaining
          <span className="text-slate-300"> · Use ← → keys</span>
        </p>
      </div>
    </div>
  );
};

export default Feed;
