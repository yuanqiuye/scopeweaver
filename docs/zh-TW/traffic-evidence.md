# 以多筆流量紀錄作為發現證據

[English](../traffic-evidence.md) · [한국어](../ko/traffic-evidence.md)

發現（finding）細節支援跨頁選取流量、指派角色與備註、為紀錄排序，以及移除綁定。流量頁也可讓你選取多筆
紀錄並附加到一個既有的發現上。從其他任務繼承而來的證據是唯讀的；請在來源任務中編輯它。

「代理自動流量綁定」預設為關閉。透過 `/api/settings` 讀取或變更 `agent_traffic_binding`。啟用它會因
request/response 審查、tool 呼叫與指示而增加 token 成本；下一個代理回合就會採用新設定。關閉時，自動綁定
參數與補充綁定工具會被隱藏、不會注入自動綁定指示，而來自已在執行中的工作階段的新自動綁定提交會被拒絕。
手動綁定、擷取、已儲存證據的讀取與匯出則仍可使用。

啟用時的正常流程是：記錄發現、自動啟動報告代理、驗證並綁定流量，再依最新的證據版本撰寫報告。報告代理會
在 `evidence` 中保留驗證指令、重要輸出、既有的真實流量 ID 及其用途。報告代理會檢查發現與執行紀錄、透過
`traffic_search` / `traffic_get` 驗證流量、呼叫 `bind_finding_traffic`，再於儲存前讀取最新的 `version`。
關閉時，報告代理不會取得額外的原始流量搜尋／讀取工具，也不會自動綁定流量；它仍可讀取手動綁定的快照並
撰寫報告。

為了相容，呼叫端仍可透過 `report_finding.traffic_refs` / `evidence_hint_id` 明確地立即綁定。綁定是選用
的：TCP 問題、未擷取到的流量或缺少確切紀錄等非 HTTP 的發現，仍可被回報。請保留指令、日誌與其他可驗證的
證據，並在有幫助時說明流量為何缺失；沒有新的必填欄位。每個提交的 ID 都必須有效且具備完整的 body。任何
失敗都會回滾整個綁定操作；報告過程中明確綁定的失敗，會回滾整份報告提交。再次附加一個既有快照，既不會
重複綁定，也不會覆蓋其備註。

## 代理識別子與報告版本

`report_finding` 接受下列選用參數。陣列順序即設定初始的證據順序。

```json
{
  "traffic_refs": [
    {"traffic_id": "real-traffic-id", "role": "baseline", "note": "Normal account request"},
    {"traffic_id": "another-real-traffic-id", "role": "proof", "note": "Reproduction request"}
  ]
}
```

角色有 `baseline`（正常對照）、`proof`（發現證明）、`verification`（額外驗證）與 `supporting`（預設的
佐證證據）。請先以 `traffic_search` / `traffic_get` 驗證真實紀錄。網域與時間只能縮小候選範圍；它們不能
建立任務所有權。

這些指示參考了
[CyberStrikeAI 的發現回報指引](https://github.com/RuoJi6/CyberStrikeAI/blob/54d56774b8bd285817d16d48b70a4a5e6e0963f7/internal/app/vulnerability_tools.go)，
並調整以配合本專案的選用綁定契約。不強制要求說明流量缺失的原因。切勿為了取得擷取而猜測 ID 或重複探測。

回應的第一行仍為 `finding recorded: <exploration node ID>`。後續的 JSON 會提供獨立的發現紀錄
`finding_id`、探索節點 `finding_node_id`，以及一份綁定摘要。

- `get_finding_traffic(finding_id)` 接受獨立的發現紀錄 ID，回傳一份排序清單與 `version`。提供
  `binding_id`、`side=request|response`、`offset` 與 `length`，即可讀取每塊最多 8192 bytes 的內容。
- `update_finding_report.finding_id` 仍接受探索節點 ID。請將 `evidence_version` 設為實際讀到的版本。若
  證據在產生過程中改變，舊版本的寫入會被拒絕；請重新讀取並重新產生。
- 沒有版本的舊版報告呼叫，並不主張涵蓋既有的流量證據。綁定、備註、角色或順序的變更，會把既有報告標記為
  需要更新。

啟用自動綁定時，`add_hint` / `add_task_hint` 可在單一 hint 中、或在批次 `hints` 陣列的每個項目中儲存
`traffic_refs`。代替其他代理回報的 planner，可用 `evidence_hint_id` 從本任務的某個 hint 選取參考，但
絕不能用繼承來的 hint。系統不會從網域、時間或瀏覽紀錄去推斷綁定。失敗的提交既不會建立部分的發現，也不會
提早啟動報告產生。

使用 `bind_finding_traffic(finding_id, traffic_refs)`，即可為既有發現補上缺少的綁定，而無需再次登錄它。
`list_findings`、`list_task_findings`、`node_detail` 與 `get_task_node_detail` 都會同時曝露 `finding_id`
與 `finding_node_id`；舊版的 `id` 維持探索節點語意。

啟動時只會對舊的 tool schema 增補選用屬性。原始的預設流量工具綁定會延伸到報告代理，而報告代理預設會取得
補充綁定工具。自訂的綁定清單、提示詞、描述與啟用狀態都維持不變。指示會在最終工具組裝之後附加：回報角色
交付既有證據；報告代理驗證、綁定並撰寫。沒有任務情境的平台對話，應將結構化 hint 交給任務代理，而非直接
回報。在宣告任務完成前先交付既有證據；缺少擷取並不會強制等待。失敗的 `report_finding` 呼叫不會啟動報告
代理。

## API

基礎路徑：`/api/exploration/findings/{finding_id}/traffic`，使用獨立的發現 ID。既有的驗證仍然適用；
`context_task` 會檢查任務可見性與繼承而來的唯讀存取。

| 方法／相對路徑 | 請求／回應 |
| --- | --- |
| `GET` | 排序後的摘要、證據版本、報告證據版本 |
| `POST` | 附加整個 `{"traffic_refs":[...]}` 批次 |
| `PATCH /{binding_id}` | `{"version":1,"role":"proof","note":"Description"}` |
| `DELETE /{binding_id}` | `{"version":1}` |
| `PUT /order` | `{"version":1,"binding_ids":["2","1"]}`；必須包含完整清單 |
| `GET /{binding_id}` | 快照 metadata 與有界的 body 預覽 |
| `GET /{binding_id}/body` | `side`、`offset`、`length`；`download=1` 會下載所有原始 bytes |

版本／順序設定衝突，以及封存期間的寫入，會回傳 `409`；繼承而來的寫入回傳 `403`；不存在的綁定或發現之外
的綁定回傳 `404`。流量／附件的讀取與驗證失敗會回傳明確的錯誤。

## 儲存與遷移

啟動時會冪等地遷移 PostgreSQL：`traffic_evidence_snapshots`、`finding_traffic_bindings`，以及
`findings.evidence_version` / `report_evidence_version`（預設 0）。它不會從過往的敘述文字推斷綁定。

快照會儲存原始流量 ID、擷取時間、URL、方法、狀態、request/response 標頭、body 長度與 SHA-256。Body 存放
在 `<data>/evidence/blobs/<前兩個字元>/<hash>.bin`，與可拋棄的 `data/traffic` 互相獨立。多個發現可共用
快照／body。沒有更新快照內容的 API；完整性不符會導致讀取與匯出失敗。

完整的 body（含大型 blob 與舊版目錄紀錄）會在原始流量寫入鎖之下讀取。檔案會先被持久化並驗證；接著在單一
PostgreSQL transaction 中寫入探索節點、intent 關係、發現、快照與綁定。只有在 commit 之後才會通知
planner。失敗可能留下未被參照的檔案，但不會留下部分的業務紀錄。

PostgreSQL advisory lock `7337741004` 協調證據檔案與 SQL 參照。任務列鎖會在封存一經排入佇列時，禁止證據
變更。還原會從 body 安裝到 metadata commit 全程持有證據鎖。刪除一個發現會連帶刪除其綁定。

清理程式每小時執行一次，且只會在活動操作之外、至少 24 小時後，才回收未被參照的內容。正常的流量清理不會
動到證據目錄。做熱資料備份時，請把 PostgreSQL 與 `data/evidence` 一起備份。

## 匯出與封存

Markdown 包含排序後的證據清單與版本；JSON 包含 metadata；CSV 另加計數與綁定 ID。`md-zip` 保留發現的
Markdown，並包含：

```text
evidence/<finding_id>/<binding_id>/
  manifest.json
  request.http
  response.http
  request.bin
  response.bin
```

Markdown 以相對路徑連結到訊息。在送出下載之前，伺服器會複製附件、驗證雜湊、壓縮並同步封存檔，並讀取每個
ZIP 項目以檢查 CRC。內容缺失或損毀會讓整個下載失敗。完整附件會保留原始的二進位 bytes。

封存 v3 會依發現的綁定蒐集快照與 body，與原始流量或網域互相獨立。熱資料只有在封存驗證之後才清理；共用的
證據會保留。還原會先驗證並安裝 body，再以 transaction 還原 metadata 與綁定，並支援失敗後重試。v1/v2 仍
可還原，缺少的新欄位會明確設為 0。

## 驗證與邊界

請透過 `ARTEX_PG_DSN`，為每個套件使用個別、全新建立的 PostgreSQL 測試資料庫，如此殘留的任務／模型
fixture 才不會啟動背景工作。請完整執行相關套件，並確認缺少設定並未造成略過：

```sh
# 每次執行前，將 ARTEX_PG_DSN 設為該套件的隔離資料庫。
# 明確的設定失敗必須讓測試失敗。
go test ./<package> -count=1
go test -race -p 1 ./evidence ./db ./agent ./server -run 'TestEvidence|TestFindingTraffic|TestFindingEvidence|TestReportFindingAtomicContract|TestTaskArchive'
```

前端檢查包含 `npx tsc --noEmit`、對受影響檔案執行 Biome、一次 Webpack 建置，以及一次 `NEXT_EXPORT=1`
靜態匯出。請使用個別的快取目錄，以免覆蓋正在執行的開發伺服器。

本機端對端驗收使用專屬連接埠、受控的 HTTP／以網域為基礎的 HTTPS 目標，以及暫存資料目錄。它涵蓋兩個綁定
入口、跨頁選取、順序／備註、錯誤、繼承而來的唯讀存取、下載，以及在刪除原始流量、封存、熱 body 回收、
還原與雜湊驗證之後的匯出。

初始實作使用一個全域的證據協調鎖。大型的綁定／匯出操作，或緩慢的附件下載，可能讓其他證據操作等待。缺少
的擷取或不完整的 body 無法被偽造。此功能既不會改變擷取設定，也不會改變對直接以 IP 位址建立的 HTTPS
連線的憑證處理。
</content>
