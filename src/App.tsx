import React from "react";
import "./App.css";
import WidgetsPanel from "./WidgetsPanel";



const App: React.FC = () => {
  return (

    
    
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">flex<span className="accent">e</span>serve Conn<span className="accent">e</span>ct</h1>
        <nav>{/* add nav links later */}</nav>
      </header>

      <main className="app-main">
        {/* LEFT SIDE (60%) */}
        <div className="left-panel">
          <section className="top-section">
            <WidgetsPanel />
          </section>

          <section className="bottom-section">
            <h2>Bottom Section</h2>
            <p>Content for the bottom section goes here.</p>
          </section>
        </div>

        {/* RIGHT SIDE (40%) */}
        <div className="right-panel">
          <div className="three-container">
            {/* 3D Scene placeholder (we'll add Three.js here later) */}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 Flexeserve Connect</p>
      </footer>
    </div>
  );
};

export default App;
