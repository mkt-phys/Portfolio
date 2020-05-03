export default function() {
  /*
  概要：環境設定のJupyterNoteBookを選択したとき
  */
  $(".jupyter").on("click", function(e) {
    $(".only-linux").hide();
  });

  /*
  概要：環境設定のLinuを選択したとき
  */
  $(".linux").on("click", function(e) {
    $(".only-linux").show();
    //linuxを選択すると環境払い出し申請を非活性にする
    $(".button" + ".apply").prop("disabled", true);
  });

  /*
  概要：
  パターン１：jupyterNotebookが選択
  →スペックが選択されると「環境払い出し申請」が活性化
  パターン２：Linuxサーバが選択
  →スペック、プロセッサ、実行環境が選択されると「環境払い出し申請」が活性化
  */
  //「環境払い出し申請」のボタンを活性化するために必要なチェックの数
  let required_number_for_activation_apply_jupyter = 3; //利用環境がJupyterNotebookの時
  let required_number_for_activation_apply_linux = 3; //利用環境がLinuxサーバの時
  $(function() {
    $(".form-check-input,.execution_env").click(function() {
      let check_count = $(".dev_apply input:checked").length; //チェックされている個数を取得
      // let execution_env = $("[name=execution_env]").val(); //セレクトボックスのvalueを格納
      // console.log(check_count);

      if ($(".jupyter").prop("checked")) {
        //利用環境が"jupyterNoteBookが選択されていた場合
        if (check_count == required_number_for_activation_apply_jupyter) {
          $(".button" + ".apply").prop("disabled", false);
        }
      } else {
        //利用環境が"Linuxサーバが選択されていた場合
        if (
          check_count == required_number_for_activation_apply_linux
          // && !execution_env == ""
        ) {
          $(".button" + ".apply").prop("disabled", false);
        }
      }
    });
  });

  /*
  説明：ボタンを押すと非活性にする
  */
  $("button").on("click", function(e) {
    $("button").prop("disabled", true);
  });
}
