import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebChat from './pages/WebChat.tsx'
import SettingsPage from './pages/Settings.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/chat/:conversationId', element: <WebChat /> },
  { path: '/settings', element: <SettingsPage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
