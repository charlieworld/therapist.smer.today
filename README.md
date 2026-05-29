# therapis.smer.today

BDSM 友善諮商資源網站。資料來源為 [Google Sheet](https://docs.google.com/spreadsheets/d/1zyTtdvSDtiKjAVUbcNXFGKP2IQ_0DleBmZwXZxLacTk/edit?gid=1534828108)，前端用 Vite + React + TypeScript + Tailwind v4 建置，部署在 GitHub Pages。

## 開發

```bash
npm install
npm run fetch-data   # 從 Google Sheet 抓資料，寫進 public/data.json
npm run dev          # 啟動本地開發伺服器
npm run build        # 產出靜態檔到 dist/
npm run preview      # 預覽 build 結果
```

## 資料來源

- 試算表必須維持「知道連結者可檢視」權限，腳本才能匿名抓取
- Sheet ID 與 gid 寫死在 `scripts/fetch-sheet.mjs` 頂端，更換時請改那邊

## 自動化

- `.github/workflows/update-data.yml`：每 3 天 UTC 00:00 跑一次 `fetch-data`，若 `public/data.json` 有 diff 就 auto-commit + push
- `.github/workflows/deploy.yml`：push 到 `main` 觸發 Pages build & deploy
- 兩個 workflow 都支援 `workflow_dispatch`，在 Actions 頁面可手動觸發

## 部署

- GitHub Pages（自訂網域 `therapis.smer.today`，CNAME 設定在 `public/CNAME`）
- Repo 需到 Settings → Pages → Source 設為 **GitHub Actions**

## 舊版

`legacy/` 保留原本 vanilla JS 版本（`index.html` + `data.js` + `script.js`）作為歷史備份。
