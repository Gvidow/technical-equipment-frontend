import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import StartPage from './StartPage.tsx'
import ITunesPage from './ITunesPage.tsx'

import { createBrowserRouter, RouterProvider  } from 'react-router-dom'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Это наша стартовая страница</h1>
  },
  {
    path: '/new',
    element: <h1>Это наша страница с чем-то новеньким</h1>
  },
  {
    path: '/vite',
    element: <App />
  },
  {
    path: '/practice',
    element: <StartPage />
  },
  {
    path: '/page',
    element: <ITunesPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ul>
      <li>
        <a href="/">Старт</a>
      </li>
      <li>
        <a href="/new">Хочу на страницу с чем-то новеньким</a>
      </li>
      <li>
        <a href="/vite">Example</a>
      </li>
      <li>
        <a href="/practice">Practice</a>
      </li>
      <li>
        <a href="/page">ITunesPage</a>
      </li>
    </ul>
    <hr />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
