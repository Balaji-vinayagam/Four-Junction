import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AddMovies from './components/AddMovies.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />} />
    <Route path='/addmovies' element={<AddMovies />} />

    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
