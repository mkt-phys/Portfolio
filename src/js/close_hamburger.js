/*
概要：ハンバーガーメニューのリンクを押したら閉じる
動作タイミング：ボタンを押したとき
参考：なし
*/
export default function () {
  $('.main-nav__item').on('click', function () {
    $('input#nav-toggle').prop('checked', false);
  });

}