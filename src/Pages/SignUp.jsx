import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/signup";

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // Result returns boolean which is passed to setValidName
    setValidName(result);
    // console.log(user);
    // console.log(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
    // console.log(pwd);
    // console.log(result);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevents skipping validation via console
    const validateUser = USER_REGEX.test(user);
    const validatePwd = PWD_REGEX.test(pwd);
    if (!validateUser && !validatePwd) {
      setErrMsg("Invalid entry.");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken.");
      } else {
        setErrMsg("Registeration failed.");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/login">Sign In</Link>
          </p>
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
            aria-live="assertive" //Makes the ARIA reads the error
          >
            {errMsg}
          </p>
          <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-cairo">
                Create a new account
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username */}
                <div className="mt-0">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-xl font-cairo leading-6 text-gray-900"
                  >
                    Username:{" "}
                    <span
                      className={validName ? "valid text-green-500" : "hidden"}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validName || !user ? "hidden" : "invalid text-red-500"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>{" "}
                  <br />
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 p-4 outline-rose-600"
                    required
                    placeholder="Username (e.g. aabdelnasser101)"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off" //Disables previous entered suggestions
                    onChange={(e) => setUser(e.target.value)}
                    aria-invalid={validName ? "false" : "true"} //Reads 'The value entered by the user has failed validation.'
                    aria-describedby="uidnote" //Gives a description to the ARIA to read
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={
                      userFocus && user && !validName
                        ? "instructions bg-black bg-opacity-95 text-white p-4 rounded-xl mt-6"
                        : "offscreen absolute left-[-9999px]"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.{" "}
                    <br />
                    Must begin with a letter. <br />
                    Letters, numbers, underscores and Hyphens are allowed.
                  </p>
                </div>
                {/* Password  */}
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-xl font-cairo leading-6 text-gray-900"
                >
                  Password:{" "}
                  <span
                    className={validPwd ? "valid text-green-500" : "hidden"}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validPwd || !pwd ? "hidden" : "invalid text-red-500"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600  sm:text-sm sm:leading-6 p-4 outline-rose-600"
                  placeholder="Make sure to choose a strong password"
                  required
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  aria-invalid={validPwd ? "false" : "true"} //Reads 'The value entered by the user has failed validation.'
                  aria-describedby="pwdnote" //Gives a description to the ARIA to read
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && pwd && !validPwd
                      ? "instructions bg-black bg-opacity-95 text-white p-4 rounded-xl"
                      : "offscreen absolute left-[-9999px]"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.{" "}
                  <br />
                  Must incldue uppercase and lowercase letters, a number and a
                  special character. <br />
                  Allowed special characters are{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent symbol">%</span>
                </p>
                {/* Confirm password  */}
                <label
                  htmlFor="confirm_pwd"
                  className="block text-sm font-medium text-xl font-cairo leading-6 text-gray-900"
                >
                  Confirm Password:{" "}
                  <span
                    className={
                      validMatch && matchPwd ? "valid text-green-500" : "hidden"
                    }
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validMatch || !matchPwd
                        ? "hidden"
                        : "invalid text-red-500"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600  sm:text-sm sm:leading-6 p-4 outline-rose-600"
                  placeholder="Re-enter your password"
                  required
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  aria-invalid={validMatch ? "false" : "true"} //Reads 'The value entered by the user has failed validation.'
                  aria-describedby="confirmnote" //Gives a description to the ARIA to read
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch
                      ? "instructions bg-black bg-opacity-95 text-white p-4 rounded-xl"
                      : "offscreen absolute left-[-9999px]"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> Must match the first
                  password field.
                </p>
                <button
                  className="flex w-full justify-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:opacity-50"
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  Sign Up
                </button>
              </form>{" "}
            </div>
          </div>
          <div className="flex justify-center m-0">
            <p>
              <span className="line">
                Already registered?{" "}
                <Link to="/login">
                  <span className="font-semibold leading-6 text-rose-600 hover:text-rose-500">
                    Sign in
                  </span>
                </Link>
              </span>
            </p>
          </div>
        </section>
      )}{" "}
    </>
  );
};
export default SignUp;
