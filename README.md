# dx-pc-ntr

Pinia Colada × Nuxt Typed Router

**All server-side codes are vibe-coded.**

## 主な機能

- TODO 管理
- ダッシュボード
- 多言語対応

## セットアップ

### 依存関係のインストール

```bash
pnpm install
```

## 開発サーバー

開発サーバーを `http://localhost:7110` で起動します

```bash
pnpm dev
```

## ディレクトリ構成

```
dx-pc-ntr/
├── app/                    # クライアントサイドコード
│   ├── assets/            # CSS・静的アセット
│   ├── components/        # Vue コンポーネント
│   ├── layouts/           # レイアウトテンプレート
│   ├── pages/             # ページコンポーネント（ファイルベースルーティング）
│   ├── mutations/         # Pinia Colada ミューテーション
│   └── queries/           # クエリキー定義
├── server/                # サーバーサイドコード
│   ├── api/              # API エンドポイント
│   └── db/               # データベースロジック
│       ├── storage.ts    # ストレージ設定
│       └── repositories/ # リポジトリパターン
├── shared/               # クライアント・サーバー共通コード
│   └── schemas/          # Zod バリデーションスキーマ
├── locales/              # i18n メッセージファイル
│   ├── ja.yaml          # 日本語
│   └── en.yaml          # 英語
└── docs/                 # ドキュメント
```

## ページ構成

[pages-structure.md](./docs/pages-structure.md) を参照してください。

## 参考リンク

- [Nuxt Typed Router ドキュメント](https://nuxt-typed-router.vercel.app/)
- [Pinia Colada ドキュメント](https://pinia-colada.esm.dev/)