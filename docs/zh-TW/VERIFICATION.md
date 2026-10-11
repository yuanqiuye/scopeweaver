# 驗證狀態與已知限制

[English](../VERIFICATION.md) · [한국어](../ko/VERIFICATION.md)

## v0.2.1 候選版本 — 2026-10-11

此 Windows 發行候選版以真實的靜態前端建置，並針對可拋棄的 PostgreSQL 16.15 資料庫測試。這些結果取代了
下方過往的相依套件與 Windows 執行階段限制；較舊的紀錄為了可追溯性而保留。

| 檢查項目 | 結果 |
| --- | --- |
| 前端相依套件稽核 | 所有嚴重度皆 0 個漏洞，含開發相依套件 |
| 前端迴歸與在地化測試 | 26 項通過；無略過 |
| 正式環境靜態匯出 | TypeScript 檢查通過；產生 31 個頁面 |
| 原生 Windows Go 測試套件，18 個套件 | 1,016 項測試／子測試通過；0 失敗；13 項既有的平台／opt-in 略過 |
| 原生 Windows 完整 server 套件 | 311 項測試／子測試通過；3 項既有的 opt-in／平台略過 |
| 代理轉接器 | 7 項單元測試與語法檢查通過；3 個 MCP/Pi 情境針對真實的已驗證後端與全新資料庫通過 |
| 本機安裝程式 | 4 個隔離 fixture 全部通過：全新安裝、過時檔案替換、相依失敗，以及前端建置失敗 |
| 後端翻譯目錄（catalog） | 1,868 個正式環境 key 通過英文／韓文完整性與 printf 引數檢查 |
| 通知隔離 | 確定性的 stale-worker 迴歸在修復前失敗、修復後通過；管理／通知選取連續 5 次執行通過 |
| Windows 證據 | 完整的 PostgreSQL 後端套件通過，含並行寫入、commit 失敗與長路徑 |
| Windows Python 與技能檔案 | 真實 Python 執行與不可用啟動器的備援通過；巢狀 Unicode 路徑通過檔案列舉與讀取處理器 |
| 內嵌 Windows 執行檔的瀏覽器 E2E | 8 項檢查通過：兩種語言的 setup 中斷保護、setup／登入、同源 SSE、用量 API 隔離、兩種在地化的用量卡片，以及沒有未捕捉的頁面錯誤 |

Go 的計數包含父測試與子測試。13 項原生略過包含：十個 Unix 自我更新 fixture、一項不可用的 symlink
權限、opt-in 的轉接器整合測試，以及即時供應商測試。轉接器整合另外檢查，Unix fixture 則由 Linux CI
涵蓋。沒有為了產生這些結果而停用任何測試。

這些迴歸重現了原本的 Windows 目錄同步失敗、在地化分隔符不一致、不可用的 Python 啟動器、通知 worker
洩漏，以及設定檔清理順序問題。E2E 的 SQL 輔助工具現在會把選項放在連線 URL 之前；一次直接的
中斷／還原檢查確認了 Windows 的 psql 能執行這些語句。

發行閘門（release gate）另外要求在合併前後通過 `frontend`、`windows`、`backend`、`agent-adapter` 與
瀏覽器 `smoke` job。發佈結果、各平台壓縮檔與 checksum 可在
[v0.2.1 發行頁](https://github.com/cskwork/scopeweaver/releases/tag/v0.2.1)取得；此原始碼紀錄並不主張
那些後續 job 或下載資產已經通過。

既有已設定的 Python 直譯器路徑會保留。若先前的安裝儲存了一個不可用的啟動器別名，請在設定中選一個可執行
的直譯器。原生 Windows 測試並不建立 Windows 自我更新行為或 macOS 執行階段行為。未使用付費的即時供應商、
外部目標或真實的通知收件者。

## 過往驗證 — 2026-10-03

記錄於 **2026-10-03**，針對英文／韓文版 ScopeWeaver，以上游 ARTEX commit `160fe13` 為基礎。測試使用
可拋棄的 PostgreSQL 資料庫與本機 fixture。此為原始碼交付；未發佈任何二進位發行版或容器映像檔。

| 檢查項目 | 結果 |
| --- | --- |
| 前端迴歸與在地化測試 | 21 項通過；TypeScript 檢查通過 |
| 正式環境靜態匯出與內嵌 Go 執行檔 | 建置成功 |
| Go 迴歸套件，18 個套件 | 986 項測試／子測試通過；1 項繼承而來的測試失敗；1 項外部供應商測試略過 |
| 完整 server 套件 | 285 項測試／子測試通過；只有 opt-in 的即時供應商測試略過 |
| 後端翻譯目錄（catalog） | 1,865 個正式環境 key 通過英文／韓文完整性與 printf 引數檢查 |
| 原文中文稽核 | 沒有未翻譯的原始碼／文件或 Go 註解；刻意保留的相容性／資料例外仍保留 |
| 桌面瀏覽器覆蓋 | 每種語言 24 條路由；無遺漏標籤或頁面層級的水平溢出 |
| 行動瀏覽器覆蓋 | 兩種語言的儀表板、任務、發現與設定；在 390px 下無頁面層級的水平溢出 |
| 真實應用程式畫面 | 兩種語言下檢查登入與通知表單；驗證 setup 檢核與初始化 |
| 語言切換 | 導覽／狀態標籤更新；選取與未送出的草稿皆保留 |
| HTTP 在地化 | 檢查 Markdown/CSV 匯出、語言協商、已儲存偏好與無效語言的拒絕 |
| GLM-5.3 供應商契約 | 以本機 HTTP/SSE fixture 通過 21 項聚焦測試／子測試；涵蓋兩條端點路徑、推理與 tool-call 重播 |
| GLM 範本瀏覽器流程 | 兩種語言下檢查兩個範本；輸入的名稱／金鑰／代理皆保留；無儲存、啟用或供應商請求 |
| 打包與啟動腳本 | Shell 語法、雙語打包 fixture 與 10 個 supervisor 案例通過 |
| 來源與相依套件 | 原始授權未變更；相依版本與 Go module 未變更；文件連結與 diff 檢查通過 |

計數包含 Go 的父測試與其子測試。套件執行使用個別資料庫，並以與正常 server 啟動相同的補充計量表初始化。
原始的測試與檢查仍維持啟用。

### 當時繼承而來的問題

`TestGraphOverviewExpandsAssociatedCompanyScope` 在 ScopeWeaver 與未改動的上游原始碼中都以
`task scope missing: <nil>` 失敗。該測試預期 graph overview 中會有詳細範圍，但上游 commit `06a43f3`
刻意讓它變得精簡。commit `75a706d` 以 `TestGraphOverviewKeepsAssociatedCompanyScopeCompact` 取代之，
改為檢查精簡的 overview，並直接驗證已儲存的公司範圍。自此之後完整的後端 CI 一直通過。

`TestTaskMetadataPatchReturnsRenameAndPin` 先前在上游驗證中會間歇性地發生暫存目錄清理失敗。它在最終的
ScopeWeaver server 執行中通過；沒有為了掩蓋它而做任何不相關的生命週期變更。

上游的 mock 預覽沒有通知 metadata 的 mock，因此其通知頁會出錯。而**真實後端的通知頁與新增頻道表單**在
兩種語言下都通過。驗證期間未送出任何通知。

v0.1.0 的驗證記錄了 **14 項 npm audit 發現：1 項 critical、9 項 high、4 項 moderate**。框架／工具更新，
以及移除未使用的 shadcn CLI 相依，已在上方的 v0.2.1 候選版中解決這些發現。執行 `cd web && npm audit`
可取得當前的 registry 報告；隨著新的安全通報發佈，audit 結果可能改變。

### 過往範圍與限制

- 選用的 `TestLiveContextReview` 需要私有的外部供應商設定，並未執行。未進行付費模型呼叫、外部目標掃描
  或真實的通知遞送。
- GLM 測試證明的是本機的 request/response 契約，而非帳號存取或供應商可用性。Coding Plan 限定於官方支援
  的工具，而 ScopeWeaver 不在清單中；請見[供應商設定](llm-providers.md)。
- 未驗證 Docker 映像檔執行與 Windows 批次執行。打包 fixture 並不主張真實的 Windows 執行階段測試。
- Setup 抵達了已驗證路由，但其中一個瀏覽器對 window load 事件的等待逾時；初始化與新密碼隨後透過真實 API
  獲得確認。
- 使用者輸入的文字、已儲存的證據、編輯過的提示詞、wire 識別子、舊版解析標記、Unicode fixture，以及原始
  上游截圖，都保留其原始內容。英文／韓文版應用程式不會翻譯任意的使用者資料或第三方工具輸出。
- `sidequestion/` 下的過往驗證文件描述的是上游工作，並非新的 ScopeWeaver 執行。

目前的遠端檢查可在 [GitHub Actions](https://github.com/cskwork/scopeweaver/actions/workflows/ci.yml) 取得。
</content>
