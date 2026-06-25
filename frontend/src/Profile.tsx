import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from './slices/userSlice';
import axios from 'axios';
import { BASE_URL } from './utils/constants';

interface UserProfileData {
  _id: string;
  firstName: string;
  lastName?: string;
  age: number;
  gender: string;
  about?: string;
  skills?: string[];
  photoUrl?: string;
}

interface RootState {
  user: UserProfileData | null;
}

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    about: user?.about || '',
    skills: user?.skills?.join(', ') || '',
    photoUrl: user?.photoUrl || ''
  });
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'error'>('success');
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-sm font-medium text-slate-500">Please log in.</div>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      const formattedSkills = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          ...formData,
          skills: formattedSkills
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setMsgType('success');
      setMsg("Profile updated successfully!");
    } catch (err) {
      setMsgType('error');
      setMsg("Error updating profile");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const skillList = formData.skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex-1">
        <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Edit Profile</h2>

          {msg && (
            <div className={`mb-4 p-3 text-xs font-medium rounded-xl ${
              msgType === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
            }`}>
              {msg}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Photo URL</label>
              <input
                type="text"
                value={formData.photoUrl}
                onChange={e => setFormData({...formData, photoUrl: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">About</label>
              <textarea
                value={formData.about}
                onChange={e => setFormData({...formData, about: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm h-24 resize-none transition"
                placeholder="Tell others about yourself..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Skills (comma separated)</label>
              <input
                type="text"
                value={formData.skills}
                onChange={e => setFormData({...formData, skills: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white outline-none rounded-xl text-sm transition"
                placeholder="React, Node, TypeScript"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-600/15 transition cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      </div>

      <div className="w-full lg:w-80">
        <div className="bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden sticky top-24">
          <div className="h-56 bg-slate-900 relative">
            <img
              src={formData.photoUrl || user.photoUrl || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
              alt="preview"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-bold text-lg">{user.firstName} {user.lastName || ''}</h3>
              <p className="text-sm text-slate-300">{user.age} · {user.gender}</p>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">About</h4>
              <p className="text-sm text-slate-600 mt-1">{formData.about || user.about || 'No about yet'}</p>
            </div>
            {skillList.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Skills</h4>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {skillList.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-violet-50 text-violet-600 text-[10px] font-semibold rounded-md">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
