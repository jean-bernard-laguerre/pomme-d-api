import React, { useState, useCallback, useMemo } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthContext from "./context/authContext";
import Products from './pages/products';
import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import './App.css'
import Header from "./context/layout/header";
import Footer from "./context/layout/footer";

const routes = [
  {path : '/', element: <Home />},
  {path : '/register', element: <Register />},
  {path : '/login', element: <Login />},
  {path: '/products', element: <Products />},
]

const router = createBrowserRouter(routes/* ,
  {basename: '/pomme-d-api/front'} */
)

function App() {
  
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')) : null
  )
  const login = useCallback((user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setCurrentUser(user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setCurrentUser(null)
  }, [])

  const userValue = useMemo(() => {
    return {currentUser, login, logout}
  }, [currentUser, login, logout])

  return (
    <AuthContext.Provider value={userValue}>
      <Header/>
      <div className='App'>
        <RouterProvider
          router={router}
        />
      </div>
      <Footer/>
    </AuthContext.Provider>
  )
}

export default App
