import {  RouterProvider, createBrowserRouter } from "react-router-dom"
import LogIn from "./Pages/LogIn"
import Home from "./Pages/Home"
import NotFound from "./Pages/NotFound"


let routers = createBrowserRouter([{
  path: "", element: <Home />,
},
{ path: "login", element: <LogIn /> },
{ path: "*", element: <NotFound /> }
])


function App() {


  return (
    <>
      <RouterProvider router={routers} />
    </>
  )
}

export default App
