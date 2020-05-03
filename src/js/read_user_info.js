export default function() {
  const data = require("../data.json");
  // console.log("ローカル読み込み", data[1].name); //「真」が出力される
  _.each(data, item => {
    // console.log(item);
    $(`
      <tr>
        <th>
          <div class="checkbox">
            <label><input type="checkbox" value=""></label>
          </div>
        </th>
        <td>${item.type}</td>
        <td>${item.name}</td>
        <td>${item.dev}</td>
        <td>${item.processor}</td>
        <td>${item.spec}</td>
        <td>${item.date}</td>
      </tr>
      `).appendTo("tbody.js-admin_apply_info");
  });
}
