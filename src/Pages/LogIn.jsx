import { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import axios from "../api/axios";
const LOGIN_URL = "/auth";

const LogIn = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password.");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized.");
      } else {
        setErrMsg("Login Failed.");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in.</h1>
          <br />
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={
              errMsg
                ? "errmsg text-center bg-red-300 font-cairo text-2xl"
                : "offscreen absolute left-[-9999px]"
            }
            aria-live="assertive" //Makes the ARIA reads the error msg once it appears
          >
            {errMsg}
          </p>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 items-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-cairo">
                Sign in
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <label
                  className="block text-sm font-medium text-xl font-cairo leading-6 text-gray-900"
                  htmlFor="username"
                >
                  Username:{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 outline-rose-600 p-4"
                    type="text"
                    id="username"
                    placeholder="Your existing username or e-mail address"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                  />
                </div>
                <label
                  className="block text-sm font-medium text-xl font-cairo leading-6 text-gray-900"
                  htmlFor="password"
                >
                  Password:{" "}
                </label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 outline-rose-600 p-4"
                  type="password"
                  id="password"
                  placeholder="Your account password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
                <button className="flex w-full justify-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <div className="flex justify-center m-0">
            <p>
              <span className="line">
                No account yet?{" "}
                <Link to="/signup">
                  <span className="font-semibold leading-6 text-rose-600 hover:text-rose-500">
                    Sign up!
                  </span>
                </Link>
              </span>
            </p>
          </div>
        </section>
      )}
    </>
  );
};
export default LogIn;
