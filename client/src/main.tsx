import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@radix-ui/themes/styles.css';
import {Theme} from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Theme appearance="dark" accentColor="gray" grayColor="sand" radius="small" scaling="100%">
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <App />
          </main>
      </Theme>
  </React.StrictMode>,
)
