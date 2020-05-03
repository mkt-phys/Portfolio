/*
概要：Sys_Nameをafax渡して利用状況を受け取る
参考：
*/
export default function() {
  console.log("getUserInfo aaaaaaaaaaa");

  let table_key = "Sys_Name";
  let cookie = new Array();
  if (document.cookie != "") {
    var tmp = document.cookie.split("; ");
    for (var i = 0; i < tmp.length; i++) {
      var data = tmp[i].split("=");
      cookie[data[0]] = decodeURIComponent(data[1]);
    }
  }
  let request = {
    Sys_Name: cookie[table_key]
  };
  // let request = `{Sys_Name: ${cookie[table_key]}}`;
  console.log(`{Sys_Name: ${cookie[table_key]}}`);

  $.ajax({
    url:
      "https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/getUserInfo",
    type: "POST",
    data: JSON.stringify(request),
    dataType: "text", //受け取る形式
    timeout: 10000
  })
    .done(function(json) {
      let response = JSON.parse(json);

      let Name = response.Name; //Sys_Name
      let Status; //申請中(0),承認済（1）,未申請のどれか（未申請はDBに登録されない）
      //申請中(0)か承認済（1）ならスペックや利用申請日時などを
      if (response.Status === "0" || response.Status === "1") {
        Status = response.Status === "0" ? "申請中" : "承認済み";
        let Instance =
          response.Instance === "0" ? "JupyterNotebook" : "Linux サーバ";
        $(".js-dev_home_instance").append(Instance);

        let Request_Date = response.Request_Date;
        $(".js-dev_home_request_date").text(Request_Date);

        let Use_Start_Date =
          typeof response.Use_Start_Date === "undefined"
            ? "まだ利用承認されていません。"
            : response.Use_Start_Date;
        $(".js-use_start_date").text(Use_Start_Date);
        console.log("Use_Start_Date", Use_Start_Date);
        console.log(typeof Use_Start_Date);

        let Processor = response.Processor === "0" ? "CPU" : "GPU";
        $(".js-dev_home_processor").append(Processor);

        $(".except_unapplied").show(); //スペック、日時を表示する
      } else {
        Status = "未申請";
      }
      $(".js-dev_home_status").text(Status);
      $(".js-dev_home_name").text(Name);
      $("h2.usage_stats-h2").text(`${Name}様の現在の利用状況:${Status}`);

      //instance 0（jupyter） かつ Status 1(承認済)なら「署名付きURL」ボタンが活性化される
      if (response.Instance === "0" && response.Status === "1") {
        $(".js-createPresignedUrl").prop("disabled", false);
      }

      /*
      申請ステータスが申請済み（response.Status==="1"）のとき「申請」タブの
      ・利用申請
      ・スペック
      ・プロセッサ
      にチェックを入れてグレーアウト（buttonをdisabled）する。
      */
      // 0（申請中）／1（承認済）
      if (response.Status === "0" || response.Status === "1") {
        //「申請」タブのどのチェックボックスが選ばれるかを判定する
        let dev_number = response.Instance === "0" ? 1 : 2; //利用環境（Jupyter or linux）
        let spec_type_number =
          response.Spec_Type === "0" ? 1 : response.Spec_Type === "1" ? 2 : 3; //(スペック:低中高)
        let processor_number = response.Processor === "0" ? 1 : 2; //プロセッサ（CPU、GPU）

        $(
          `#inline_development0${dev_number},
          #inline_spec0${spec_type_number},
          #inline_processor0${processor_number}`
        ).trigger("click");
        $(
          `input[name=inlineRadioOptions_env],
          input[name=inlineRadioOptions_spec],
          input[name=inlineRadioOptions_processor]`
        ).prop("disabled", true);
        $(
          `label[for="inline_development0${dev_number}"],
          label[for="inline_spec0${spec_type_number}"],
          label[for="inline_processor0${processor_number}"]`
        ).css({
          color: "black"
        });

        //「環境払い出し申請」を非活性にする
        $(".js-dev_apply").prop("disabled", true);
      }
    })

    .fail(function(json) {
      let stringData = JSON.stringify(json);
      let parseData = JSON.parse(stringData);
      $(".js-dev_top_home").text(parseData.responseText);
    })
    .always(function() {});
}
