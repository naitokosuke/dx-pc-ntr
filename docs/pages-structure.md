app/
  pages/
    index.vue                           // ダッシュボード（今日/期限切れ/進捗サマリ）
    todos/
      index.vue                         // 一覧（検索・絞り込み・ページングは query で表現）
      new.vue                           // 作成（モーダル運用も可）
      [id]/
        index.vue                       // 詳細
        edit.vue                        // 編集
    projects/
      index.vue                         // プロジェクト一覧
      new.vue                           // プロジェクト作成
      [projectId]/
        index.vue                       // プロジェクト配下の TODO 一覧
        settings.vue                    // プロジェクト設定（色/並び/通知など）
    tags/
      index.vue                         // タグ一覧（作成/リネーム含む）
      [tag]/
        index.vue                       // タグ別 TODO 一覧
    search/
      index.vue                         // 全体横断検索（即時/遅延切替可能）
    archived/
      index.vue                         // アーカイブ一覧（復元導線あり）
  error.vue                             // エラーページ（404、500など）
