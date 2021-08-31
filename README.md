<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="80" />
  </a>
</p>

# はじめに

モダンなフロントエンドアプリおよびWebページを開発するためのな環境が構築済みのスターターセットです。
使用した主な技術スタックを以下に記します。

* Gatsby - Reactを利用して静的なWebページを生成する静的サイトジェネレータです。
* React - ユーザインタフェース構築のためのJavaScriptライブラリである。
* TypeScript - 静的型付けによりJavaScriptをより安全に記述でき、生産性を向上させるためのプログラミング言語。
* Material UI - GoogleのMaterialデザインにより実装されたUIコンポーネントやCSSスタイリングの仕組みを提供します。


# インストール方法

まずは[公式ページ](https://www.gatsbyjs.com/)からGatsby CLIをインストールしてください。

プロジェクトを作成したいディレクトリで以下のコマンドを実行するとプロジェクトのテンプレートができます。

```
$ gatsby new [プロジェクト名] https://github.com/visualiz-inc/visualiz-react-starter.git
```

# プロジェクトディレクトリ構成

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
    |      i18n.ts 多言語化を実現します
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

# 開発環境の起動

プロジェクトの作成ができたら以下のコマンドでパッケージ等の依存関係を解決しましょう。

```
$ yarn 
```

次に以下のコマンドで、localhostに開発用サーバーを起動することができます。

```
yarn start
```

出力されたホストにブラウザでアクセスするとページが表示されます
デフォルトはlocalhost:8000になっています。

```
http://localhost:8000
```

# ページの作成と記述

以下のように```page```配下にファイルを追加することで、ページを追加することができます。

```
src/pages/name.tsx
```
この場合は```https://example.com/name```にアクセスすると対象のページが表示されます。

ディレクトリをネストさせることもできます。
```
pages/aaa/bbb/ccc.tsx (https://example.com/aaa/bbb/ccc)
```

ファイルをindex.tsxにするとディレクトリ名でのアクセスもできます。
```
pages/aaa/bbb/index.tsx (https://example.com/aaa/bbb)
```

ページを表示させるために必要な最低限のルールは以下の通りです
詳しくは[React公式](https://ja.reactjs.org/)や[TypeScript公式](https://www.typescriptlang.org/)を参照するか、「React 入門」などでググってみてください。

ReactやJavaScript、TypeScriptがわからなくとも以下のテンプレートを記述すればあとはHTML＆CSSのように記述することができます。
```<h1>```の部分からはHTMLとして記述できます。

```tsx
import React from "react";
export default () => {
  return (
    <>
      <h1>Hello React !!!</h1>
    </>
  );
}
```

ファイルの上部に```import "style.scss"```を追加するとスタイルシートを読み込めます

```scss
.title {
  font-size: 30px;
  color : #112233
}
```

#### 基本的には普通のHTMLと同じだが、```class```の指定のみ```className```としなければならないので注意！
(これはJavaScriptにclassというキーワードがあるため)

```tsx
import React from "react";
import "./style.scss"

export default () => {
  return (
    <>
      <h1 className="title">Hello React !!!</h1>
    </>
  );
}
```

class以外であれば普通に指定できる

```html
<h1 style="font-size:15px;"></h1>
```

読み込めるスタイルシートの種類は以下の通りです。

* CSS
* SCSS
* SASS

## Material UIとスタイリング

ページごとにスタイルシートを記述するよりも、よく利用するブロックごと共通パーツ（コンポーネント）化させたり、あらかじめそういった便利なパーツを含むライブラリを利用することで、一貫性のある美しいUIを実現できたり、生産性を高めることができます。

本プロジェクトはMateria UIを利用することで、Googleのマテリアルデザインを実現しつつ、より効率的なスタイリングを行うことを選びました。詳しくは公式ページを参照してください。

InputやButton、レイアウト組などは積極的に利用していってください。

Material UIはJavaScript(TypeScript)のコード内でスタイルを記述する仕組みを提供します。
これによりcssよりも複雑なことを可能にしたり、管理をシンプルにすることができますので、こちらも積極的に利用してください。
詳しくは公式のスタイルドキュメントを参照。

[Materia UI　公式ドキュメント](https://material-ui.com/ja/)
[Materia UI スタイルガイド](https://material-ui.com/styles/basics/)


```tsx
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  test: {
    // ここにスタイルルールを記述
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "#ffffff",
    height: "48px",
    padding: "0 30px",
  },
});

export default function Hook() {
  const classes = useStyles();
  return <h1 className={classes.test}>Hello React !</h1>;
}
```

# 多言語化対応

[react i18n](https://react.i18next.com/)を利用することで多言語化も簡単に実現することができます。
詳しくは公式を参照してください。


##### 言語リソースを定義
```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
          "text1": "Hello, World !"
        },
        ja: {
          "text1": "こんにちは、世界！"
        },
    },
    lng: "ja",
    fallbackLng: "ja",
    interpolation: { escapeValue: false },
});
```

##### 言語リソースを利用
```tsx
import React from "react";
import { useTranslation } from "react-i18next";

export const ReactComponent = () => {
    const {t} = useTranslation();
    return (
      <div>
          {t("text1")}
      </div>
    );
}

```



