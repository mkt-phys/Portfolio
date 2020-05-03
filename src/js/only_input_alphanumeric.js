//英数字しか入力させない（参考：https:pisuke-code.com/jquery-input-alphanumeric-only/）
//キーイベントについて（参考：http://cly7796.net/wp/javascript/examined-the-jquery-of-key-events/）

//.js-only-alphanumericを当てたところが入力が英数字のみになる
export default function() {
  //keydown:キーボードを押したとき
  $(document).on("keydown", ".js-only-alphanumeric", function(e) {
    let k = e.keyCode;
    let str = String.fromCharCode(k);
    // console.log("str", str);
    let regex = "/^[0-9a-zA-Z]*$/"; //正規表現：Regular expression
    let result = str.match(/^[0-9a-zA-Z]*$/);
    console.log(result);

    if (
      !(
        str.match(/^[0-9a-zA-Z]*$/) ||
        //カーソルを移動できるように
        (37 <= k && k <= 40) ||
        //削除とタブキーとデリートキーの入力ができるように
        k === 8 ||
        k === 9 ||
        k === 46
      )
    ) {
      return false;
    }
  });

  //keydown:押したキーボードを離したとき
  $(document).on("keyup", ".js-only-alphanumeric", function(e) {
    // if (e.keyCode === 9 || e.keyCode === 16) return;
    // /iは大文字と小文字を区別しない正規表現
    // console.log("keydown", this.value);
    this.value = this.value.replace(/[^0-9a-zA-Z]+/i, "");
  });

  //blur:テキスト入力欄からフォーカスが外れた時
  $(document).on("blur", ".js-only-alphanumeric", function() {
    // /iは大文字と小文字を区別しない正規表現
    // console.log("blur", this.value);
    this.value = this.value.replace(/[^0-9a-zA-Z]+/i, "");
  });
}
