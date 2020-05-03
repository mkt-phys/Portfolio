export default function() {
  // ここに処理を書く;
  $("#js-selectFile").on("click", "button", function() {
    $("#js-upload").click();
    return false;
  });

  $("#js-upload").on("change", function() {
    //選択したファイル情報を取得し変数に格納
    var file = $(this).prop("files")[0];
    //アイコンを選択中に変更
    $("#js-selectFile")
      .find(".icon")
      .addClass("select")
      .html("選択中");
    //未選択→選択の場合（.filenameが存在しない場合）はファイル名表示用の<div>タグを追加
    if (!$(".filename").length) {
      $("#js-selectFile").append('<div class="filename"></div>');
    }
    //ファイル名を表示
    $(".filename").html("ファイル名：" + file.name);
  });
}
