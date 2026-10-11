# LLM 供應商範本

ScopeWeaver 使用其既有的供應商格式與自訂 base URL 欄位。範本只會填入**新設定檔的表單**；它不會連線
供應商、不會儲存憑證、不會啟用設定檔，也不會修改既有設定檔。

## Z.ai GLM-5.3

![GLM-5.3 新設定檔範本](../../screenshots/en/llm-templates.png)

這是未輸入任何 API 金鑰的範本預覽；並非真實的供應商連線。

開啟 **LLM → 新增 → 設定範本**。若為 API 計費，請選 **General API（建議）**；只有在取得 Z.ai 對
ScopeWeaver 的授權後，才選 **Coding Plan（參考）**。

| 欄位 | General API | Coding Plan 參考 |
| --- | --- | --- |
| 格式 | OpenAI Chat Completions | OpenAI Chat Completions |
| Base URL | `https://api.z.ai/api/paas/v4` | `https://api.z.ai/api/coding/paas/v4` |
| 模型 | `glm-5.3` | `glm-5.3` |
| 思考（Thinking） | `enabled` | `enabled` |
| 推理強度（Reasoning effort） | `max` | `max` |
| 情境視窗（K） | `1000` | `1000` |
| 輸出上限 | `0`（省略；用供應商預設） | `0`（省略；用供應商預設） |

這兩個端點與計費是分開的：General API 的用量與 Coding Plan 的訂閱額度彼此獨立。請見
[Z.ai 連線設定](https://zcode.z.ai/en/docs/configuration)。測試前請先確認你帳號的模型存取權與計費方式。

GLM-5.3 接受文字輸入，具有 1M-token 的情境視窗，並要求推理（reasoning）保持啟用。支援的強度值為
`low`、`high` 與 `max`；本範本使用 `max`。模型欄位仍可編輯，因此選用其他模型時，請檢查推理與情境設定。
請見[官方 GLM-5.3 指南](https://docs.z.ai/guides/llm/glm-5.3)。

**Coding Plan 支援邊界：** Z.ai 將 Coding Plan 限定於官方支援的工具。ScopeWeaver 不在該清單中；端點範本
並不會建立權限或支援關係。在此使用前請先取得 Z.ai 授權。請見[工具整合](https://docs.z.ai/devpack/tool/others)
與[使用政策](https://docs.z.ai/devpack/usage-policy)。ScopeWeaver 不會假冒受支援的工具，也不會自動切換
計費端點。

請輸入設定檔名稱與你自己的 API 金鑰。套用任一範本時，會保留你已輸入的名稱、金鑰、代理、session-header
設定，以及其他不相關的偏好。就緒後再儲存；新設定檔必須另外啟用。既有的**測試連線**與**載入模型**控制項，
只有在被點擊時才會發出真實的供應商請求；本變更不會執行即時的供應商測試。

已於 **2026-10-03** 對照官方文件驗證。供應商的可用性、帳號權益與政策可能變動。

[English](../llm-providers.md) · [한국어 안내](../ko/llm-providers.md)
</content>
