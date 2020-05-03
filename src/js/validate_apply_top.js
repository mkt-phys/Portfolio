/*
概要：種々のバリデーション
      emailはメール形式
      ユーザー名とリポジトリ名は英数字のみ
      １．「正しく入力しました」のチェックボックスを入れる
      ２．バリデーションが通れば「申請」ボタンを活性化、通らなければモーダルで警告を出す。
参考：https://programmercollege.jp/column/9253/#section200
    :正規表現（英数字空文字無し） https://qiita.com/sea_ship/items/0b35b5c1c98eebfa5128
    :「特定のセレクタ以外」を表現http://www.jquerystudy.info/reference/selectors/not.html
*/

function validate_only_alphanumeric(input) {
  if (!input.match(/^[0-9a-zA-Z]+$/)) {
    return false; //validate_flagをfalseにする
  }
  return true;
}
function validate_email(email) {
  if (!email.match(/.+@.+\..+/)) {
    return false; //validate_flagをfalseにする
  }
  return true;
}

export default function() {
  let alert_sentence = ""; //バリデーションに引っかかったときに表示させる文章
  let validate_flag = true;

  $(".js-apply_top_validate").click(function() {
    let apply_repository = $("#apply_repository").val(); //リポジトリ名

    //プロジェクト名と氏名が空白ならfalse
    if (
      $("#apply_project").val() === "null" ||
      $(".admin_name").val() === "null"
    ) {
      validate_flag = false;
    }

    validate_flag = validate_only_alphanumeric(apply_repository);
    if (!validate_only_alphanumeric(apply_repository)) {
      alert_sentence += "リポジトリ名は英数字のみ入力できます。";
    }

    let admin_email = $(".admin_email").val(); //メールアドレス
    validate_flag = validate_email(admin_email);
    if (!validate_email(admin_email)) {
      alert_sentence += "管理者のメールアドレスを正しく入力してください。";
    }

    let admin_user_name = $(".admin_user_name").val(); //ユーザー名
    validate_flag = validate_only_alphanumeric(admin_user_name);
    if (!validate_only_alphanumeric(admin_user_name)) {
      alert_sentence += "管理者のユーザー名は英数字のみ入力できます。";
    }
    $(".dev_name").each(function() {
      if ($(this).val === null) {
        validate_flag = false;
        return false;
      }
    });

    // let dev_email = [];
    $(".dev_email").each(function() {
      // dev_email.push($(this).val());
      if (!validate_email($(this).val())) {
        validate_flag = false;
        alert_sentence += "開発者のメールアドレスを正しく入力してください。";
        return false;
      }
    });

    // let dev_user_name = [];
    $(".dev_user_name").each(function() {
      // dev_user_name.push($(this).val());
      if (!validate_only_alphanumeric($(this).val())) {
        validate_flag = false;
        alert_sentence += "開発者のユーザー名は英数字のみ入力できます。";
        return false;
      }
    });

    // //名前の重複があればvalidate_flagをfalseにする
    // let all_user_name = [];
    // all_user_name.push($(".admin_name").val());
    // $(".dev_user_name").each(function() {
    //   all_user_name.push($(this).val());
    // });
    // console.log(all_user_name);

    // let loop_flag = true;
    // for (let i = 0; i < all_user_name.length; i++) {
    //   for (let j = 0; j < all_user_name.length; j++) {
    //     if (i !== j && all_user_name[i] === all_user_name[j]) {
    //       validate_flag = false;
    //       alert_sentence += "ユーザー名が重複しています。";
    //       loop_flag = false;
    //       return false;
    //     }
    //   }
    //   if (!loop_flag) {
    //     return false;
    //   }
    // }

    if (validate_flag) {
      $(".js-apply-top.button").prop("disabled", false);
      alert_sentence = "";
    } else {
      alert(alert_sentence);
      $(".js-apply_top_validate").prop("checked", false);
      $(".js-apply-top.button").prop("disabled", true);
      alert_sentence = "";
    }

    //申請が活性化されている状態で申請以外をクリックしたら、「正しく入力されました」のチェックを外しと「申請」を非活性にする。
    $(":not(.js-apply_top_validate)" + ":not(.js-apply-top").focus(function() {
      $(".js-apply-top.button").prop("disabled", true);
      $(".js-apply_top_validate").prop("checked", false);
    });
  });
}
