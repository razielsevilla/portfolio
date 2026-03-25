// src/App.js
// The Living Codex — root application entry point.
// All old components replaced by the BookShell architecture.

import React from 'react';
import BookShell from './components/book/BookShell';
import './styles/book-system.css';
import './styles/book-system-v2.css';


function App() {
  return <BookShell />;
}

export default App;