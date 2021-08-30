<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>

### はじめに

モダンなフロントエンドアプリおよびWebページを開発するためのな環境が構築済みのスターターセットです。
使用した主な技術スタックを以下に記します。

* Gatsby - Reactを利用して静的なWebページを生成する静的サイトジェネレータです。
* React - ユーザインタフェース構築のためのJavaScriptライブラリである。
* TypeScript - 静的型付けによりJavaScriptをより安全に記述でき、生産性を向上させるためのプログラミング言語。
* Material UI - GoogleのMaterialデザインにより実装されたUIコンポーネントやCSSスタイリングの仕組みを提供します。


### インストール方法

まずは[公式ページ](https://www.gatsbyjs.com/Gatsby-Monogram.svg)からGatsby CLIをインストールしてください。

プロジェクトを作成したいディレクトリで以下のコマンドを実行するとプロジェクトのテンプレートができます。

```
$ gatsby new [プロジェクト名] https://github.com/visualiz-inc/gatsby-material-theme.git
```

### プロジェクトディレクトリ構成

```
│  .babelrc jsファイルをビルドをするための設定を記述します
│  .gitignore git管理から除外するための設定を記述します
│  gatsby-config.js Gatsbyの設定を記述します
│  package.json プロジェクトの設定や依存関係を記述します
│  README.md 簡単な説明を記述します（このファイル）
│  tsconfig.json TypeScriptの設定をします
│
└─src
    ├─App クライアントサイドアプリケーション（SPA）
    │      index.tsx クライアントサイドアプリケーションのエントリーポイント
    │      theme.ts Material UI のテーマ設定を記述します
    │
    ├─Libs
    │  │  Frame.tsx ポータル画面のテンプレート（ヘッダー、サイドバー、メイン）
    │  │  
    │  └─Components 共通パーツ
    │
    ├─pages 静的ページを入れます pages/sample/index.tsにはhttp://www.hoge.com/sampleのようにアクセスできます
    │
    |
    └─Styles 共通スタイルを記述します
          global.css 共通のスタイルシート
          index.ts このファイルを各ページでインポートする
```