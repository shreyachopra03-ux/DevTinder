import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("katrinakaif90@gmail.com");
  const [password, setPassword] = useState("Katrina@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        { emailId, password },
        { withCredentials: true }
      );

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div className="w-full max-w-sm">
    <div className="card w-full rounded-2xl border border-base-300 bg-base-200 shadow-xl">
      <div className="card-body gap-3 p-6 sm:p-7">
        <h2 className="mb-2 text-center text-2xl font-bold">
          Login
        </h2>

        <fieldset className="fieldset">
          <legend className="fieldset-legend font-semibold">
            Email ID
          </legend>

          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend font-semibold">
            Password
          </legend>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your password"
          />
        </fieldset>

        <button
          onClick={handleLogin}
          className="btn btn-primary mt-4 w-full"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
);
}

export default Login;