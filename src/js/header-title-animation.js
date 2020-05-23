/*
概要：
動作タイミング：
参考：
*/
export default function () {
  // ここに処理を書く
  $(function () {
    setTimeout(function () {
      $(".fly-in-text").removeClass("hidden")
    }, 500)
  })();
}