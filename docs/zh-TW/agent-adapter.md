# AI 代理轉接器

Claude Code 與 Codex 可作為本機 stdio MCP 伺服器、Pi 可作為專用擴充，向 ScopeWeaver 發出請求。三個
用戶端都使用既有的已驗證 API 來讀取任務清單、進度、覆蓋率與發現。設定環境變數
`SCOPEWEAVER_ALLOW_WRITES=true` 後，也可使用建立任務與暫停／繼續。

這個轉接器是讓編碼代理（coding agent）去控制 ScopeWeaver 的功能。它並不是把 ScopeWeaver 內部的
planner／worker 換成編碼代理，也不是把編碼代理的訂閱換成模型 API 金鑰。

需要 Node.js 22 以上，以及一個執行中的 ScopeWeaver。在 `adapters/agent` 執行 `npm ci`，並將
`SCOPEWEAVER_URL` 與既有管理員密碼（`SCOPEWEAVER_PASSWORD`）或登入權杖（`SCOPEWEAVER_TOKEN`）設為
環境變數。請勿將密碼或權杖提交進儲存庫。可用 `SCOPEWEAVER_LANGUAGE=ko` 要求韓文回應。

- Claude Code：`claude mcp add --transport stdio scopeweaver -- node /絕對路徑/scopeweaver/adapters/agent/src/mcp.js`
- Codex：`codex mcp add scopeweaver -- node /絕對路徑/scopeweaver/adapters/agent/src/mcp.js`
- Pi：`pi -e /絕對路徑/scopeweaver/adapters/agent/pi-extension.js`

建立任務後，可能會依後端模型設定立即開始執行。請遵守本專案的本機隔離環境使用限制，並先確認目標範圍。
建立的回應代表任務已登錄，不代表檢測已完成。請求失敗會以明確的錯誤回傳，且不會自動重試寫入請求。

設定、工具清單、錯誤處理，以及使用真實後端的 E2E 測試方式，請參考[轉接器文件](../../adapters/agent/README.md)。
</content>
