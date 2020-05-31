# scss ディレクトリ分け方

参考<https://www.plusdesign.co.jp/blog/?p=6578>

- base
  リセットやノーマライズなどベースになるスタイル、変数を定義するスタイルを格納
  例：\_base.scss ／ \_variable.scss … etc
- layout
  ヘッダーやフッターなど、大まかなレイアウトで切り分けられるスタイルを格納
  例：\_header.scss ／ \_footer.scss ／ \_nav.scss …etc
- module
  ボタンやテーブル、余白など細かいパーツのスタイル（使い回しできるもの）を格納
  例：\_button.scss ／ \_form.scss ／ \_grid.scss ／ \_table.scss … etc
