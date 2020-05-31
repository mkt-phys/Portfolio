import "normalize.css"

// Bootstrapのスタイルシート側の機能を読み込む
import "bootstrap/dist/css/bootstrap.min.css";
// BootstrapのJavaScript側の機能を読み込む
import "bootstrap";
import "./main.scss";
// import Three from "vanta/vender/three.r95.min"
// import Particles from "particlesjs/dist/particles.min.js";
// import "particles.js/particles.js"

// const pj = new ParticlesJS()
const particles = require("./assets/particles.json")

import DoParticleJS from "./js/doParticleJS";

import HeaderTitleAnimation from "./js/header-title-animation";
import Close_hamburger from "./js/close_hamburger";

// import Internal_link_scroll from "./js/internal_link_scroll"

// ページ読み込み時に実行したい処理
window.onload = () => {
  DoParticleJS();
  HeaderTitleAnimation();
  Close_hamburger();
};