import {
  RouterProvider,
  createBrowserRouter,
  Link,
  BrowserRouter,
} from "react-router-dom";
import LogIn from "./Pages/LogIn";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import SignUp from "./Pages/SignUp";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  { path: "login", element: <LogIn /> },
  { path: "signup", element: <SignUp /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
