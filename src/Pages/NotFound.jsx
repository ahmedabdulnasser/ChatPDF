import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function NotFound() {
  return (
    <section className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      <div className="rounded-3xl bg-white drop-shadow">
        <Link to="/">
          <div className="flex">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="relative left-4 top-4 text-rose-600"
            />{" "}
            <span className="relative text-sm left-[1.4rem] top-[0.88rem] font-cairo text-slate-500">
              Go Home
            </span>
          </div>
        </Link>

        <div className="w-[32rem] h-[24rem] flex flex-col justify-center items-center">
          <div className="text-8xl font-cairo text-rose-600">404</div>
          <p className="text-2xl font-cairo text-rose-600">
            Oopsie! Page not found.
          </p>
          <p className="text-lg italic font-mono mt-2 text-center">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </section>
  );
}
