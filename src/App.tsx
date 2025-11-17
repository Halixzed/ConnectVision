import React from "react";
import "./App.css";
import WidgetsPanel from "./WidgetsPanel";
//import MapView from "./MapView";
import ButtonLabel from "./ButtonLabel";
import DateTime from "./DateTime";
import SettingsPanel from "./SettingsPanel";
//import WelcomeMessage from "./WelcomeMessage";



const App: React.FC = () => {
  return (

    
    
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">flex<span className="accent">e</span>serve Conn<span className="accent">e</span>ct</h1>
        <nav>{/* add nav links later */}</nav>
        
        <div className="header-right">
          <DateTime />
          <SettingsPanel />
        </div>
      </header>

      <main className="app-main">
        {/* LEFT SIDE (60%) */}
        <div className="left-panel">
          
          <section className="top-section">
            
            <div className="section-label"></div>
            <ButtonLabel title="BU Eastern Canada" subtitle="53 stores inside" />
            <ButtonLabel title="BU Gulf Coast" subtitle="467 stores inside" />
            <ButtonLabel title="BU Texas" subtitle="469 stores inside" />
            <ButtonLabel title="BU Western Canada" subtitle="5 stores inside" />
          </section>

          <section className="bottom-section">
            <div className="bottom-left">
              {/* Future widgets / logs / statuses */}
              
              <WidgetsPanel />
              <div className="dashboard-label"></div>
            </div>

            
          </section>
        </div>

        {/* RIGHT SIDE (40%) */}
        <div className="right-panel">
          <div className="three-container">
            <div className="section-label">3D SCENE</div>

            {/* Under construction placeholder */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: "1.8rem",
                opacity: 0.4,
                color: "#5a5a5aff",
              }}
            >
              🚧 Under Construction 🚧
            </div>

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
