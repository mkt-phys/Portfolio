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

import HeaderTitleAnimation from "./js/header-title-animation"
// ページ読み込み時に実行したい処理
window.onload = () => {
  // ParticlesJS();
  DoParticleJS();
  HeaderTitleAnimation();
  // particlesJS.load('particles-js', particles, function () {
  //   console.log('callback - particles-js config loaded');
  // });
  // Particles.init({
  //   selector: ".background",
  //   color: "blue",
  //   sizeVariations: 5,
  //   minDistance: 200,
  //   connectParticles: true
  // });

};