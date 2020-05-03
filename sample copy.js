const AWS = require("aws-sdk"),
  documentClient = new AWS.DynamoDB.DocumentClient(),
  sns = new AWS.SNS();

//SNSの設定
const TargetArn = process.env["NotificationTopic"];

//dynamoDBのテーブル名
// const TableName = "mhlw-user-info";
const TableName = process.env["GitHubEnterpriseDynamodbName"];

exports.handler = (event, context, callback) => {
  let json = JSON.parse(event["body"]);
  console.log("json", json);
  let keyArry = [];
  keyArry.push({
    Sys_Name: json.Sys_Name
  });
  let keyObj = {};
  json.dev_member.forEach(function(val, index) {
    keyObj = {
      Sys_Name: val.dev_user_name
    };
    keyArry.push(keyObj);
  });

  let response_json = (statusCode, data) => {
    return {
      statusCode: statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: data
    };
  };

  //管理者と開発者をまとめる。→重複があればreturnで返す。keyArry={Sys_Name :ユーザ名}の形式で入っている
  let admin_and_dev_name = [];
  admin_and_dev_name.push(json.Sys_Name);
  json.dev_member.forEach(function(val, index) {
    admin_and_dev_name.push(val.dev_user_name);
  });
  let set = new Set(admin_and_dev_name); //setにすると重複したものが取り除かれる[1,2,2,3]⇒[1,2,3]
  if (set.size !== admin_and_dev_name.length) {
    return callback(
      null,
      response_json(
        200,
        "ユーザー名が重複しています。もう1度登録しなおしてください。"
      )
    );
  }

  let get_params = {
    //テーブル名をキーとするオブジェクトの中にKeysをキーとするオブジェクトの値としてkeyArryを格納
    RequestItems: {
      "mhlw-dynamodb-githubenterprise": {
        Keys: keyArry
      }
    }
  };

  documentClient.batchGet(get_params, function(err, data) {
    if (err) {
      return callback(
        null,
        response_json(
          500,
          "システムエラーが発生しました。システム管理者にご連絡ください。"
        )
      );
      // } else if (data.Responses["mhlw-user-info"].length == 0) {
    } else if (data.Responses[TableName].length == 0) {
      //Sys_Nameに重複がない場合ここにくる。
      //プロジェクト名とリポジトリ名に重複がないか調べる。
      let scan_params = {
        TableName: TableName,
        FilterExpression: "#p = :project or #r = :request_repository",
        //属性名のプレースホルダの定義
        ExpressionAttributeNames: {
          "#p": "Project",
          "#r": "Request_Repository"
        },
        //検索値のプレースホルダの定義
        ExpressionAttributeValues: {
          ":project": json.Project,
          ":request_repository": json.Request_Repository
        }
      };
      //プロジェクト名とリポジトリ名の検索クエリ実行
      documentClient.scan(scan_params, function(err, data) {
        if (err) {
          return callback(
            null,
            response_json(
              500,
              "システムエラーが発生しました。システム管理者にご連絡ください。"
            )
          );
        } else if (data.Items.length != 0) {
          const content = {
            Message:
              "既にサービスのユーザとして登録されている方からのサービス利用申請を拒否しました。",
            Subject:
              "既にサービスのユーザとして登録されている方からの利用申請がありました。",
            TargetArn: TargetArn
          };
          sns.publish(content, function(err, data) {
            if (err) {
              return callback(
                null,
                response_json(
                  500,
                  "システムエラーが発生しました。システム管理者にご連絡ください。"
                )
              );
            }
            return callback(
              null,
              response_json(
                200,
                "サービスにお申込みいただき、誠にありがとうございます。<br>お客様は既にサービスのユーザとして登録されています。"
              )
            );
          });
        } else {
          //管理者のデータ
          let admin_info = {
            Sys_Name: json.Sys_Name,
            Project: json.Project,
            Request_Repository: json.Request_Repository,
            Name: json.Name,
            MailAddress: json.Mailaddress,
            Attribute: "0",
            Request_Status: "3"
          };

          let admin_and_dev_info = []; //登録する管理者と開発者の複数人の情報
          admin_and_dev_info.push(admin_info);

          let dev_member_info = {};
          json.dev_member.forEach(function(val, index) {
            dev_member_info = {
              Sys_Name: val.dev_user_name, //開発者独自のもの
              Project: json.Project,
              Request_Repository: json.Request_Repository,
              Name: val.dev_name, //開発者独自のもの
              MailAddress: val.dev_email, //開発者独自のもの
              Attribute: "1",
              Request_Status: "3"
            };
            admin_and_dev_info.push(dev_member_info);
          });

          //SNSで送信するメールアドレスの情報
          let all_email_address = json.Mailaddress; //管理者のメールアドレス

          for (let i = 0; i < dev_member_info.length; i++) {
            all_email_address += dev_member_info[i].MailAddress + "\n";
          }

          // 追加する項目のオブジェクト生成
          var putRequest = [];
          admin_and_dev_info.forEach(function(item) {
            let obj = {
              PutRequest: {
                Item: item
              }
            };
            putRequest.push(obj);
          });
          // テーブルの指定・追加項目をセット
          // let test = "mhlw-dynamodb-githubenterprise";
          var batchWrite_params = {
            RequestItems: {
              "mhlw-dynamodb-githubenterprise": putRequest
              // TableName: putRequest
            }
          };

          //複数書き込み
          documentClient.batchWrite(batchWrite_params, function(err, data) {
            if (err) {
              return callback(
                null,
                response_json(
                  500,
                  "システムエラーが発生しました。システム管理者にご連絡ください。"
                )
              );
            }
            console.log("snsの直前");
            console.log(" TargetArn", TargetArn);
            const content = {
              Message:
                "サービスの利用申請を受け付けました。\n GitHub Enterpriseにログインして以下の情報を入力してリポジトリを作成してください。\n\n -Organization Name" +
                json.Project +
                "\n -Repository name" +
                json.Request_Repository +
                "\n Email address \n" +
                all_email_address,
              Subject: `ポータルにログインして、利用承認／否認のご判断をお願いします。`,
              TargetArn: TargetArn
            };
            console.log("content", content);
            sns.publish(content, function(error, data) {
              if (error) {
                console.log("error", error);
                return callback(
                  null,
                  response_json(
                    500,
                    "システムエラーが発生しました。システム管理者にご連絡ください。"
                  )
                );
              }
              console.log("data", data);

              return callback(
                null,
                response_json(
                  200,
                  "サービスにお申込みいただき、誠にありがとうございます。<br>お客様のサービス利用申請を受け付けました。"
                )
              );
            });
          });
        }
      });
    } else {
      const content = {
        Message:
          "既にサービスのユーザとして登録されている方からのサービス利用申請を拒否しました。",
        Subject:
          "既にサービスのユーザとして登録されている方からの利用申請がありました。",
        TargetArn: TargetArn
      };
      sns.publish(content, function(error, data) {
        if (error) {
          return callback(
            null,
            response_json(
              500,
              "システムエラーが発生しました。システム管理者にご連絡ください。"
            )
          );
        }
        return callback(
          null,
          response_json(
            200,
            "サービスにお申込みいただき、誠にありがとうございます。<br>お客様は既にサービスのユーザとして登録されています。"
          )
        );
      });
    }
  });
};
