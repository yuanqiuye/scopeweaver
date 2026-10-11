// Auto-generated Traditional Chinese (zh-TW) messages. Do not edit by hand.
import type { en } from "../settings.ts";

export const zhTw: Record<keyof typeof en, string> = {
  judgeUsageTitle: "審批 token 用量",
  judgeUsageHelp: "備援審批的總計，與規劃器及工作代理的呼叫分開計算。",
  judgeUsageCalls: "審批呼叫",
  judgeUsageInput: "輸入 token",
  judgeUsageOutput: "輸出 token",
  judgeUsageCacheRead: "快取讀取",
  judgeUsageCacheWrite: "快取寫入",
  judgeUsageRecent: "過去 30 天每日輸入與輸出 token",
  judgeUsageDay: "{date} · {calls} 次呼叫 · {tokens} 個 token",
  setupUnavailableTitle: "無法確認設定狀態",
  setupUnavailableHelp: "後端或資料庫暫時無法使用。為保護既有密碼，已停用設定功能。請恢復服務後再重試。",
  captureDisabled:
    "停用時（預設）不會記錄任何流量。代理<b>不會取得代理伺服器設定，也不會取得流量工具</b>，其提示詞中<b>也不含代理伺服器指示</b>。切換後會立即重建代理以套用變更。",
  binding:
    "預設為關閉。啟用後，在建立漏洞時觸發的報告代理會檢視既有的 HTTP 請求與回應、連結相關流量，然後撰寫報告。<b>檢查封包與額外的工具呼叫會增加 token 用量。</b>",
  proxy:
    "所有代理的<b>目標流量</b>都會經由此對外代理伺服器，以隱藏來源 IP 或使用跳板主機。支援 <b>HTTP、HTTPS 與 SOCKS5</b>，並可選用 <code>user:pass</code> 驗證。留空則直接連線。",
  proxyCapture:
    "<b>啟用流量擷取</b>時，這是記錄用代理伺服器的<b>上游</b>：流量會先被記錄再轉送。停用擷取時，代理伺服器會直接注入代理的 Bash/WebFetch。它與網路搜尋及 LLM 代理伺服器各自獨立。",
  proxySocks:
    "<b>SOCKS5 注意事項：</b>停用擷取時，每個命令列工具都必須支援 <code>ALL_PROXY</code>。curl 支援，但部分工具可能會忽略它。使用 SOCKS5 時建議啟用擷取：MITM 代理伺服器會直接建立連線，不需要工具本身支援。",
  constraints:
    "啟用後，每個任務的<b>操作限制</b>（即任務總覽中的允許/拒絕項目）會納入代理的系統提示詞，以界定探索邊界，例如僅測試目前連接埠或禁止暴力破解。",
  constraintTargets:
    "可分別控制<b>規劃器</b>與<b>工作代理</b>的注入；兩者預設皆為啟用。變更會在下次讀取時套用，無須重建代理。停用注入後，該代理將不再看到這些限制。",
  compression:
    "<b>noa 情境壓縮</b>使用模型來壓縮冗長的對話歷程（norma v0.4.0）。啟用後，<b>規劃器、工作代理、主代理與聊天</b>的情境會改用 noa，而非內建壓縮。原始內容會封存於任務工作目錄供檢閱。變更會影響後續執行，無須重建代理；停用後會立即恢復內建壓縮。",
  webSearch:
    "這是網路搜尋的<b>總開關與來源設定</b>。請先啟用此項，再於<b>各代理的設定中啟用 web_search</b>。搜尋會回傳標題、連結與摘要；WebFetch 則擷取完整內容。網路搜尋<b>不會使用記錄用代理伺服器</b>，且與流量擷取各自獨立。",
  searchSources:
    "可用的來源包括：無需 API 金鑰的 <b>DuckDuckGo (ddgs)</b>、需要 Brave API 金鑰的 <b>Brave 免費方案</b>、需要 Tavily API 金鑰的 <b>Tavily</b>，或使用目前 LLM 設定檔的 <b>DeepSeek</b>。必須先開啟總開關，代理才能啟用網路搜尋。",
  deepseekRequirements:
    "此來源會重複使用<b>目前啟用的 LLM 設定檔</b>。它<b>僅支援官方 DeepSeek 模型</b>，且該設定檔<b>必須使用 Anthropic 協定</b>。DeepSeek 的 OpenAI 端點不支援伺服器端搜尋。切換 LLM 設定檔可能導致此來源無法使用。",
  deepseekBehavior:
    "與其他來源不同，搜尋會<b>在 DeepSeek 的伺服器上</b>執行。每次搜尋都會增加一次模型呼叫與 token 成本。搜尋請求<b>會略過上方的對外代理伺服器</b>，且<b>不會記錄為流量</b>。結果<b>僅包含標題與連結</b>，沒有摘要；如需完整內容請使用 WebFetch。",
  python:
    "自訂<b>腳本</b>工具會使用此 Python 直譯器。系統會在啟動時偵測，並優先使用 python3。請輸入虛擬環境或特定版本的絕對路徑，或留空以自動偵測執行環境。",
  workers:
    "每個任務同時執行的工作代理數量（預設：3）。工作代理越多，平行探索能力與成本也越高。變更<b>會套用於之後啟動的任務</b>；執行中的任務不受影響。",
  sendPreference: "此偏好設定<b>僅儲存在此瀏覽器</b>，不會與您的帳號同步。更換瀏覽器或清除網站資料後，需要重新設定。",
  updateLauncher:
    "一鍵更新需仰賴監督腳本來重新啟動應用程式。請使用 <code>start.sh</code> 啟動（Windows：<code>start.bat</code>）。直接執行二進位檔時，結束後不會自動重新啟動。",
  pagination: "{from}–{to} / {total} 筆記錄",
};
