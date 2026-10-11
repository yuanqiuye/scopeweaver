// Auto-generated Traditional Chinese (zh-TW) messages. Do not edit by hand.
import type { en } from "../providers.ts";

export const zhTw: Record<keyof typeof en, string> = {
  template: "設定範本（僅限新設定檔）",
  chooseTemplate: "選擇範本…",
  general: "Z.ai GLM-5.3 · 通用 API（建議）",
  coding: "Z.ai GLM-5.3 · Coding Plan（僅供參考）",
  introduction:
    "選用：預先填入連線欄位，再輸入設定檔名稱與您的 API 金鑰。您的金鑰、代理伺服器與名稱會保留。選擇範本不會儲存或啟用設定檔。準備好後請先儲存，再另行啟用。模型仍可編輯。",
  generalHelp:
    "使用通用 API 端點並依 API 計費，與 Coding Plan 訂閱額度各自獨立。請確認您的 Z.ai 帳號具備該模型的存取權限與計費設定。",
  codingHelp:
    "僅供參考：Coding Plan 使用獨立的端點與訂閱額度。Z.ai 限制其僅能用於官方支援的工具，而 ScopeWeaver 不在其列。在 ScopeWeaver 使用此端點前，請先取得 Z.ai 的授權。",
  modelHelp:
    "GLM-5.3 僅支援文字，內容長度為 1M 個 token。推理功能必須保持啟用；支援的強度等級為 low、high 與 max。此範本會選用 max，並將輸出上限維持為 0（供應商預設值）。若您更換模型，請重新檢視這些設定。",
  officialModel: "GLM-5.3 模型指南",
  officialPolicy: "Coding Plan 使用政策",
};
