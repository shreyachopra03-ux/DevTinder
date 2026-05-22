import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5173/login", 
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 min-h-[60vh]">
      <div className="card card-border bg-base-200 w-96 shadow-xl rounded-box">
        <div className="card-body p-8">
          <h2 className="card-title text-2xl font-bold justify-center mb-4">Login</h2>
          
          <div className="space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold">Email ID</legend>
              <input 
                type="email" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full" 
                placeholder="Enter your email" 
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold">Password</legend>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full" 
                placeholder="Enter your password" 
              />
            </fieldset>
          </div>

          <div className="card-actions justify-center mt-6">
            <button onClick={handleLogin} className="btn btn-primary w-full">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;