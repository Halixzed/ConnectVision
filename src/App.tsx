import React from "react";
import "./App.css";
//import WidgetsPanel from "./WidgetsPanel";
//import MapView from "./MapView";
import ButtonLabel from "./ButtonLabel";
import DateTime from "./DateTime";
import SettingsPanel from "./SettingsPanel";
import ModeToggle from "./ModeToggle";
import WidgetsPanel from "./WidgetsPanel";
import OperatorControlCard from "./OperatorControlCard";
//import WelcomeMessage from "./WelcomeMessage";




const App: React.FC = () => {

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">flex<span className="accent">e</span>serve Conn<span className="accent">e</span>ct</h1>
        <nav>{/* add nav links later */}</nav>        
        <div className="header-right">
          <ModeToggle />
          <DateTime />
          <SettingsPanel />
        </div>
      </header>
      <main className="app-main">
        {/* LEFT SIDE (60%) */}
        <div className="left-panel">
          <div className="head-office-container">
            <section className="bu-section">
              <div className="section-label">HEAD OFFICE OVERVIEW</div>
              <ButtonLabel title="BU Eastern Canada" subtitle="53 stores inside" />
              <ButtonLabel title="BU Gulf Coast" subtitle="467 stores inside" />
              <ButtonLabel title="BU Texas" subtitle="469 stores inside" />
              <ButtonLabel title="BU Western Canada" subtitle="5 stores inside" />
            </section>          
            <section className="widget-section">              
              <WidgetsPanel />         
            </section>
          </div>
          <div className="operator-container">
            <section className="operator-control-section">
              <OperatorControlCard unitName="Flexeserve 2 T 600" zone1={{label: "Zone 1", onTurnOn: () => console.log("Zone 1 Turned On"), onTurnOff: () => console.log("Zone 1 Turned Off"), onSet75: () => console.log("Zone 1 Set to 75°F"), onSet85: () => console.log("Zone 1 Set to 85°F")}} zone2={{label: "Zone 2", onTurnOn: () => console.log("Zone 2 Turned On"), onTurnOff: () => console.log("Zone 2 Turned Off"), onSet75: () => console.log("Zone 2 Set to 75°F"), onSet85: () => console.log("Zone 2 Set to 85°F")}} />
              <OperatorControlCard unitName="Flexeserve 2 T 400" zone1={{label: "Zone 1", onTurnOn: () => console.log("Zone 1 Turned On"), onTurnOff: () => console.log("Zone 1 Turned Off"), onSet75: () => console.log("Zone 1 Set to 75°F"), onSet85: () => console.log("Zone 1 Set to 85°F")}} zone2={{label: "Zone 2", onTurnOn: () => console.log("Zone 2 Turned On"), onTurnOff: () => console.log("Zone 2 Turned Off"), onSet75: () => console.log("Zone 2 Set to 75°F"), onSet85: () => console.log("Zone 2 Set to 85°F")}} />
            </section>

          </div>
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
