# ScopeWeaver 來源與變更

[English](../PROVENANCE.md) · [한국어](../ko/PROVENANCE.md)

ScopeWeaver 是 [Autumn-27/ARTEX](https://github.com/Autumn-27/ARTEX) 的獨立衍生專案，以 commit
`160fe13` 為基礎。它在 [cskwork/scopeweaver](https://github.com/cskwork/scopeweaver) 獨立維護，與原專案
之間沒有 GitHub fork-network 關係。

標示日期為 **2026-10-02** 的 ScopeWeaver 變更，涵蓋產品名稱、英文預設／韓文可選的介面與訊息、文件與
內附代理指引、setup／build／start／update／password-reset 提示、報告與代理的語言處理，以及發佈命名。
執行檔為 `scopeweaver`（Windows 為 `scopeweaver.exe`）；壓縮檔名稱遵循
`scopeweaver-<version>-<os>-<arch>.zip`。Docker Compose 會在本機建置 checkout 出來的原始碼。所設定的
發行 workflow 以本儲存庫與 GHCR 為目標。

原始的 `LICENSE` 維持不變。原始著作權、貢獻者致謝與上游 changelog 歷史仍歸屬於 ARTEX。為了相容性，
Go module `github.com/Autumn-27/artex`、原始碼進入點 `./cmd/artex`、`ARTEX_*` 設定契約、`artex`
資料庫預設值，以及 `ARTEX` 登入使用者名稱都維持不變。

此修改日期並非發行版本標籤。它不主張二進位發行版或容器映像檔已經發佈。`sidequestion/` 下的過往驗證文件
描述的是上游的執行，並非新的 ScopeWeaver 執行。翻譯過的過往 JSON 會保留技術識別子與量測值，同時標示出
被翻譯的敘述部分。

**2026-10-03** 的額外變更完成了伺服器翻譯稽核，並新增 GLM-5.3 設定範本及其必需、恆為啟用的推理
（reasoning）相容性。範本使用既有的供應商轉接器，不會自動建立或啟用設定檔。

後續來自 ARTEX commit `e2c8a23`、`86729b6` 與 `a951e4a` 的上游修正也已回移至此：同源的正式環境 SSE、
審批模型 token 的獨立計量，以及 fail-closed 的驗證——含初始密碼的原子性建立與有界的資料庫連線池。新的
訊息與部署指引皆提供英文與韓文。原始著作權已在回移 commit 中標註；其餘的 ScopeWeaver 變更維持不變。
</content>
