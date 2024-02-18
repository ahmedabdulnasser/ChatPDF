import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <Link to="/login">Sign In</Link> <br />
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
