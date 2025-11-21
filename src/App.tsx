import React, { useState } from "react";
import "./App.css";
import ButtonLabel from "./ButtonLabel";
import DateTime from "./DateTime";
import WidgetsPanel from "./WidgetsPanel";
import OperatorControlCard from "./OperatorControlCard";
import ThreeScene from "./ThreeScene";
import PresentationWrapper, { slideTo } from "./PresentationWrapper";
import HeroSlide from "./HeroSlide";

const slideLabels = ["Hero", "Head Office", "Operator + 3D"];

const App: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const businessUnits = [
    {
      title: "BU Eastern Canada",
      subtitle: "53 stores inside",
      alarms: ["Ottawa Store 4: High temp alert", "Montreal Store 12: Door open"],
      offlineUnits: ["Brampton Store 2"],
    },
    {
      title: "BU Gulf Coast",
      subtitle: "467 stores inside",
      alarms: ["Houston Store 8: Fan fault"],
      offlineUnits: [],
    },
    {
      title: "BU Texas",
      subtitle: "469 stores inside",
      alarms: [],
      offlineUnits: ["Dallas Store 11"],
    },
    {
      title: "BU Western Canada",
      subtitle: "5 stores inside",
      alarms: [],
      offlineUnits: [],
    },
  ];

  const slides = [
    // Slide 0 - Hero
    <HeroSlide />,

    // Slide 1 - Head Office Overview
    <>
      <h1 className="section-label">Head Office Overview</h1>
      <div className="head-office-content">
        <section className="bu-section head-office-left">
          {businessUnits.map((bu) => (
            <ButtonLabel
              key={bu.title}
              title={bu.title}
              subtitle={bu.subtitle}
              alarms={bu.alarms}
              offlineUnits={bu.offlineUnits}
            />
          ))}
        </section>
        <div className="head-office-right">
          <WidgetsPanel />
        </div>
      </div>
    </>,

    // Slide 2 - Operator View with 3D Scene
    <>
      <h1 className="section-label">Operator Control</h1>
      <div className="operator-layout">
        <section className="operator-control-section operator-layout-left">
          <OperatorControlCard
            unitName="Flexeserve 2 T 600"
            zone1={{ label: "Zone 1", onTurnOn: () => {}, onTurnOff: () => {}, onSet75: () => {}, onSet85: () => {} }}
            zone2={{ label: "Zone 2", onTurnOn: () => {}, onTurnOff: () => {}, onSet75: () => {}, onSet85: () => {} }}
          />
          <OperatorControlCard
            unitName="Flexeserve 2 T 600"
            zone1={{ label: "Zone 1", onTurnOn: () => {}, onTurnOff: () => {}, onSet75: () => {}, onSet85: () => {} }}
            zone2={{ label: "Zone 2", onTurnOn: () => {}, onTurnOff: () => {}, onSet75: () => {}, onSet85: () => {} }}
          />
        </section>
        <div className="operator-layout-right">
          <h2 className="mini-title">3D Visualisation</h2>
          <div className="three-container">
            <ThreeScene modelUrl="./models/demo.glb" />
          </div>
        </div>
      </div>
    </>,
  ];

  return (
    <div className={`app-container ${activeSlide > 0 ? "has-header" : ""}`}>
      <header className={`app-header ${activeSlide > 0 ? "visible" : ""}`}>
        <h1 className="app-title">
          flex<span className="accent">e</span>serve Conn<span className="accent">e</span>ct
        </h1>
        <div className="header-right">
          {slideLabels.map((label, index) => (
            <button key={label} onClick={() => slideTo(index)}>
              {label}
            </button>
          ))}
          <DateTime />
        </div>
      </header>

      <PresentationWrapper slides={slides} onSlideChange={setActiveSlide} />

      <nav className="dot-nav" aria-label="Slide navigation">
        {slideLabels.map((label, index) => (
          <button
            key={label}
            type="button"
            className={index === activeSlide ? "active" : ""}
            onClick={() => slideTo(index)}
            aria-label={`Go to ${label} slide`}
            aria-current={index === activeSlide}
          />
        ))}
      </nav>

      <footer className="app-footer">
        <p>&copy; 2025 Flexeserve Connect</p>
      </footer>
    </div>
  );
};

export default App;
