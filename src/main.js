// Bootstrapのスタイルシート側の機能を読み込む
import "bootstrap/dist/css/bootstrap.min.css";
// BootstrapのJavaScript側の機能を読み込む
import "bootstrap";
import Input_add_remove from "./js/input_add_remove";
import Change_apply_button from "./js/change_apply_button";
import Only_input_alphanumeric from "./js/only_input_alphanumeric";
import Read_user_info from "./js/read_user_info";
import Button_activation from "./js/button_activation";
import Form_file_upload from "./js/form_file_upload";
import Output_instance_spec from "./js/output_instance-spec";
import Regist_apply from "./js/connect_api/regist_apply";
import ApplyForInstance_dev_apply from "./js/connect_api/applyForInstance_dev_apply";
import Save_sysname_in_cookie from "./js/save_sysname_in_cookie";
import DenyCreateInstance_admin_apply_info from "./js/connect_api/denyCreateInstance_admin_apply_info";
import ListUserInfo from "./js/connect_api/listUserInfo_admin_user_info";
import GetUserInfo_dev_home from "./js/connect_api/getUserInfo_dev_home";
import Validate_apply_top from "./js/validate_apply_top";
import CreatePresignedUrl_dev_home from "./js/connect_api/createPresignedUrl_dev_home";
import GetRepository_dev_project from "./js/connect_api/getRepository_dev_project";
import ListApplicantInfo_admin_apply_info from "./js/connect_api/listApplicantInfo _admin_apply_info";
import CreateInstance_admin_apply_info from "./js/connect_api/createInstance_admin_apply_info";

import "./main.scss";

// ページ読み込み時に実行したい処理
window.onload = () => {
  Input_add_remove();
  Change_apply_button();
  // Read_user_info();
  Button_activation();
  Form_file_upload();
  Output_instance_spec();
  Regist_apply();
  ApplyForInstance_dev_apply();
  Save_sysname_in_cookie();
  DenyCreateInstance_admin_apply_info();

  //dev_top.htmlにアクセスしたときだけjsを動かす
  if (
    document.URL.match("dev_top") ||
    document.URL.match("mhlw-administrator/github-pages-sample/index.html")
  ) {
    GetUserInfo_dev_home();
    GetRepository_dev_project();
  }

  Validate_apply_top();
  CreatePresignedUrl_dev_home();

  //admin_top.htmlにアクセスしたときだけjsを動かす
  if (document.URL.match("admin_top")) {
    ListUserInfo();
    ListApplicantInfo_admin_apply_info();
  }

  CreateInstance_admin_apply_info();
};
