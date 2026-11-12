import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';
import './tailwind.css';

createRoot(document.getElementById('root')!).render(<React.StrictMode><div className="min-h-screen w-full"><App /></div></React.StrictMode>);
