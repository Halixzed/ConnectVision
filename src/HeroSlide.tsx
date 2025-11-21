import "./HeroSlide.css";
import { slideTo } from "./PresentationWrapper";

const HERO_VIDEO_MP4 = `${import.meta.env.BASE_URL}AdobeStock_485936139_Video_HD_Preview.mp4`;
const HERO_VIDEO_MOV = `${import.meta.env.BASE_URL}AdobeStock_485936139_Video_HD_Preview.mov`;

export default function HeroSlide() {
  return (
    <div className="hero-slide">
      <video className="hero-video" autoPlay muted loop playsInline preload="auto">
        <source src={HERO_VIDEO_MP4} type="video/mp4" />
        <source src={HERO_VIDEO_MOV} type="video/quicktime" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-text">
        <p className="hero-badge">Flexeserve Connect</p>
        <h1>
          Intelligent Hot Food Holding Units,
          <br />
          operated with confidence.
        </h1>
        <p className="hero-tagline">Always on, always optimised.</p>
        <button className="hero-explore" onClick={() => slideTo(1)}>
          Explore
          <span aria-hidden="true">&#8594;</span>
        </button>
      </div>
    </div>
  );
}