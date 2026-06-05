# therapist.smer.today

> 禁羈友善助人工作者資源網 — 願意公開標註為「禁羈友善」的專業助人者名單，讓需要心理支持的 BDSMer 更容易找到理解、被接納的陪伴。

正式網站：<https://therapist.smer.today>

資料來源：[臺灣 BDSMer 友善之助人工作者資源網（Google Sheet）](https://docs.google.com/spreadsheets/d/1zyTtdvSDtiKjAVUbcNXFGKP2IQ_0DleBmZwXZxLacTk/edit?gid=1534828108)

---

## 貢獻者

| 角色 | 成員 |
|---|---|
| 發起 ・ 資料維護 | 長裙富翁、小藤 |
| 網頁工程 ・ 維護 | TinaTea 緹、柚子泥 |

---

## 技術棧

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4**（PostCSS via `@tailwindcss/vite`）
- **React Router v7**（client-side routing）
- **Motion**（micro-interactions / page transitions）
- 資料解析：`papaparse`
- OG 圖生成：`puppeteer-core` + 系統 Chrome
- 部署：**GitHub Pages**

## 在地開發

```bash
npm install
npm run fetch-data   # 從 Google Sheet 抓資料，寫進 public/data.json
npm run dev          # 啟動 Vite dev server
npm run build        # 產出靜態檔到 dist/
npm run preview      # 預覽 build 結果
npm run typecheck    # 跑 tsc 型別檢查
npm run generate-og  # 重新生成 OG 圖（需要系統 Chrome）
```

## 專案結構

```
.
├── public/                  # 靜態資源（CNAME、favicon、og-image、data.json）
├── src/
│   ├── components/          # FilterBar、ResourceCard、Hero、ResourceExplorer 等
│   ├── components/layout/   # SiteShell、NavBar、SiteFooter
│   ├── pages/               # HomePage、AboutPage、ContributePage、NotFoundPage
│   ├── App.tsx              # Router 設定
│   ├── main.tsx             # 進入點
│   ├── index.css            # Tailwind v4 theme tokens
│   └── types.ts             # Resource / ResourceData 型別
├── scripts/
│   ├── fetch-sheet.mjs      # Google Sheet → public/data.json
│   ├── generate-og.mjs      # 用 puppeteer-core 截 OG 圖
│   └── og-template.html     # OG 圖版型
├── .github/workflows/
│   ├── deploy.yml           # push to main → GitHub Pages
│   └── update-data.yml      # 每 3 天 cron 抓資料
└── legacy/                  # 原始 vanilla JS 版本，歷史備份
```

## 資料來源

- 試算表必須維持「知道連結者可檢視」權限，腳本才能匿名抓取（用 CSV export endpoint，不需要 API key）
- Sheet ID 與 gid 寫死在 `scripts/fetch-sheet.mjs` 頂端，更換時請改那邊
- 資料正規化：`region` 切成 `regions[]`、`is_remote` flag、`topics` 切成 array

## 自動化

| Workflow | Trigger | 用途 |
|---|---|---|
| `deploy.yml` | push to `main` 或 `workflow_dispatch` | 跑 build 然後部署到 GitHub Pages |
| `update-data.yml` | cron `0 0 */3 * *`（UTC）或 `workflow_dispatch` | 每 3 天從 sheet 抓資料；若 `public/data.json` 有 diff 就 auto-commit + push（會自動觸發 deploy）|

兩個 workflow 都可以在 Actions 頁面手動觸發。

## 部署

- 自訂網域 `therapist.smer.today`（CNAME 設定在 `public/CNAME`）
- Repo Settings → Pages → Source 設為 **GitHub Actions**
- SPA 路由 fallback：build 階段把 `index.html` 複製成 `404.html`，讓 GitHub Pages 在打到不存在的路徑時仍交給 React Router 處理

## 舊版備份

`legacy/` 保留最早的 vanilla JS 版本（`index.html` + `data.js` + `script.js`）作為歷史備份。

## 版權與使用條款

© 2026 禁羈友善助人工作者資源網

本資源網所收錄之名單、文字內容、設計與網站程式碼，皆受著作權法保護。

- 本資源網僅供個人查閱與**非商業用途**使用。
- 任何形式之轉載、再次發佈、改作、整合或商業使用，請於使用前來信
  [bdsmertherapist@gmail.com](mailto:bdsmertherapist@gmail.com) 取得書面同意。
- 名單中之助人者個資，已取得當事人「公開列入本資源網」之同意；
  此同意不得視為授權第三方轉用其資料。

完整條款請見 [`LICENSE`](./LICENSE)。

---

made with love ✦ 2026
