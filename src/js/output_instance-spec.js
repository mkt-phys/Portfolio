//dev_top.htmlのインスタンスタイプを変更する。
//instance-spec.jsonにスペック表のjsonがある。

export default function() {
  const data = require("../instance-spec.json"); //スペック表のjson
  const input_env = "input[name=inlineRadioOptions_env]";
  const input_spec = "input[name=inlineRadioOptions_spec]";
  const input_processor = "input[name=inlineRadioOptions_processor]";

  /*
  利用環境、スペック、プロセッサのどれかのラジオボタンがクリックされれば発動
  インスタンスタイプを書き変える。
  */
  $(`${input_env},${input_spec},${input_processor}`).click(function() {
    const env = $(`${input_env}:checked`).val();
    const spec = $(`${input_spec}:checked`).val();
    const processor = $(`${input_processor}:checked`).val();
    // console.log(env, spec, processor);

    if (env != null && spec != null && processor != null) {
      // console.log("3つとも選択してます");
      switch (env) {
        case "jupyter":
          // console.log("jupyter");

          switch (processor) {
            case "gpu":
              // console.log("jupyter-GPU");
              switch (spec) {
                case "low":
                  // console.log("jupyter-GPU-low");
                  $(".instance-spec").text(data[0].Sagemaker.GPU.low);
                  break;
                case "middle":
                  // console.log("jupyter-GPU-middle");
                  $(".instance-spec").text(data[0].Sagemaker.GPU.middle);
                  break;
                case "high":
                  // console.log("jupyter-GPU-high");
                  $(".instance-spec").text(data[0].Sagemaker.GPU.high);
                  break;
              }
              break;
            case "cpu":
              // console.log("jupyter-CPU");
              switch (spec) {
                case "low":
                  // console.log("jupyter-CPU-low");
                  $(".instance-spec").text(data[0].Sagemaker.CPU.low);
                  break;
                case "middle":
                  // console.log("jupyter-CPU-middle");
                  $(".instance-spec").text(data[0].Sagemaker.CPU.middle);
                  break;
                case "high":
                  // console.log("jupyter-CPU-high");
                  $(".instance-spec").text(data[0].Sagemaker.CPU.high);
                  break;
              }

              break;
          }
          break;
        case "linux":
          // console.log("linux");
          switch (processor) {
            case "gpu":
              // console.log("linux-GPU");
              switch (spec) {
                case "low":
                  // console.log("linux-GPU-low");
                  $(".instance-spec").text(data[0].EC2.GPU.low);
                  break;
                case "middle":
                  // console.log("linux-GPU-middle");
                  $(".instance-spec").text(data[0].EC2.GPU.middle);
                  break;
                case "high":
                  // console.log("linux-GPU-high");
                  $(".instance-spec").text(data[0].EC2.GPU.high);
                  break;
              }
              break;
            case "cpu":
              // console.log("linux-CPU");
              switch (spec) {
                case "low":
                  // console.log("linux-CPU-low");
                  $(".instance-spec").text(data[0].EC2.CPU.low);
                  break;
                case "middle":
                  // console.log("linux-CPU-middle");
                  $(".instance-spec").text(data[0].EC2.CPU.middle);
                  break;
                case "high":
                  // console.log("linux-CPU-high");
                  $(".instance-spec").text(data[0].EC2.CPU.high);
                  break;
              }
              break;
          }
      }
    } else {
      // console.log("3つとも選択してください");
    }
  });
}
