import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import "./i18n/i18n";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <BrowserRouter>

      <App />

      <Toaster
        position="top-right"
        toastOptions={{

          style: {

            background: "#0d1726",
            color: "#fff",
            border:
              "1px solid rgba(255,255,255,0.1)",

          },

          success: {

            duration: 3000,

          },

          error: {

            duration: 4000,

          },

        }}
      />

    </BrowserRouter>

  </React.StrictMode>

)