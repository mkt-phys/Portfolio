//index.htmlの複製、削除を押した時にそれぞれの動作をするjs
//参考：~~~見つからず
//こっちの方がbetterかも：https://qiita.com/horikeso/items/d000f765dfbf60c6a6a2

export default function() {
  //複製ボタンが押されたときの挙動
  $(document).on("click", ".add", function() {
    $(this)
      .parent()
      .parent()
      .clone(true)
      .insertAfter(
        $(this)
          .parent()
          .parent()
      );

    //削除ボタンが1個になったら削除ボタンを非活性
    var num_del = $(".del").length;
    if (num_del !== 1) {
      $(".del").prop("disabled", false);
    } else {
      $(".del").prop("disabled", true);
    }
  });

  //削除ボタンが押されたときの挙動
  $(document).on("click", ".del", function() {
    var target = $(this)
      .parent()
      .parent();

    if (target.parent().children().length > 1) {
      target.remove();
    }
    //削除ボタンが1個になったら削除ボタンを非活性
    var num_del = $(".del").length;
    if (num_del == 1) {
      $(".del").prop("disabled", true);
    } else {
      $(".del").prop("disabled", false);
    }
  });
}
