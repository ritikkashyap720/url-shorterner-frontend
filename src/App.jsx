import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GetUrl from './pages/GetUrl'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },{
      path:"/:shortID",
      element:<GetUrl/>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
