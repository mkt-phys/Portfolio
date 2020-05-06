// Bootstrapのスタイルシート側の機能を読み込む
import "bootstrap/dist/css/bootstrap.min.css";
// BootstrapのJavaScript側の機能を読み込む
import "bootstrap";

import "./main.scss";
// import Three from "vanta/vender/three.r95.min"
// import Rings from "vanta/vendor/three.r95.min"
import Three from "./js/library/three.r95.min";
import Rings from "./js/library/vanta.rings.min";
import Appaaaaa from "./js/library/app";
// ページ読み込み時に実行したい処理
window.onload = () => {
    Three();
    Rings();
    Appaaaaa();
};