export default function() {
  // ここに処理を書く

  $(".js-dev_apply").click(function() {
    let instance =
      $("input[name='inlineRadioOptions_env']:checked").val() === "jupyter"
        ? "0"
        : "1"; //利用環境（Jupyter,Linux）
    let spec = $("input[name='inlineRadioOptions_spec']:checked").val(); //スペック（低、中、高）
    switch (spec) {
      case "low":
        spec = "0";
        break;
      case "middle":
        spec = "1";
        break;
      case "high":
        spec = "2";
        break;
    }
    let processor =
      $("input[name='inlineRadioOptions_processor']:checked").val() === "cpu"
        ? "0"
        : "1"; //プロセッサ（CPU,GPU）
    let instance_type = $(".instance-spec").text(); //インスタンスタイプ(p2.16xlargeなど)
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
      Sys_Name: cookie[table_key],
      Instance: instance,
      Spec_Type: spec,
      Processor: processor,
      Spec: instance_type
    };

    $.ajax({
      url:
        "https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/applyForInstance",
      type: "POST",
      data: JSON.stringify(request),
      dataType: "text",
      timeout: 10000
    })
      .done(function(json) {
        var stringData = JSON.stringify(json);
        var parseData = JSON.parse(stringData);
        $(".js_test_return_api").text(parseData.responseText);
      })

      .fail(function(json) {
        var stringData = JSON.stringify(json);
        var parseData = JSON.parse(stringData);
        $(".js_test_return_api").text(parseData.responseText);
      })
      .always(function() {});
  });
}
