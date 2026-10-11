# 貢獻 ScopeWeaver

[English](CONTRIBUTING.md) · [한국어](CONTRIBUTING.ko.md) · 繁體中文

歡迎各種貢獻：bug 修正、上游 ARTEX 回移（backport）、相依套件升級、文件與測試。

## 開始之前

- 請先閱讀[使用限制](README.md#license-and-disclaimer)。貢獻不得加入以真實線上系統為目標的功能，也不得
  削弱那些限制。
- 較大的變更，請先開一個 issue，讓我們就做法達成共識。
- 每個 pull request 聚焦在單一主題。較小的 PR 審閱得比較快。

## pull request 的要求

- **英文與韓文並行。** 使用者可見的文字需要兩種語言：
  - 伺服器訊息：`locale/` 中的 `locale.Register(key, en, ko)`
  - web UI：`web/src/i18n/messages/` 中的 `en` 與 `ko` 物件
  - 文件：`README.md` 搭配 `README.ko.md`，以及 `docs/` 搭配 `docs/ko/`
- **為變更的行為補測試。** 新增或更新在缺少你的變更時會失敗的測試。不得為了讓測試通過而停用、略過或
  放寬既有檢查。
- **只用可拋棄的資料庫。** 會寫入 PostgreSQL 的測試，必須使用名為 `scopeweaver_test_*` 的全新資料庫
  （代理轉接器 E2E 測試則用 `scopeweaver_adapter_*`）。
- **標註上游工作。** 針對 ARTEX 回移，請加上 `Upstream-commit: mhtsec/ARTEX@<sha>` 與一個標註原作者的
  `Co-authored-by:` trailer，並更新 `docs/PROVENANCE.md` 與 `docs/ko/PROVENANCE.md`。
- **授權。** 貢獻依本儲存庫的 [AGPL-3.0](LICENSE) 授權接受。

## 要執行的檢查

這些對應 [.github/workflows/ci.yml](.github/workflows/ci.yml) 中的 CI job：

```bash
# 後端：每個 Go 套件（將 ARTEX_PG_DSN 設為可拋棄的 scopeweaver_test_* 資料庫）
go test ./... -count=1

# 前端
cd web && npm ci && npm test && npm run build:static

# 代理轉接器（以及它針對 scopeweaver_adapter_* 資料庫的真實後端 E2E 測試）
cd adapters/agent && npm ci && npm test && npm run check
SCOPEWEAVER_ADAPTER_E2E=1 go test ./server -run '^TestAgentAdapterE2E$' -count=1
```

`e2e` workflow 也會在每個 PR 及合併後，針對真實執行檔跑一個必要的瀏覽器煙霧測試。若要在本機針對一個
執行中的伺服器與一個全新的 `scopeweaver_test_*` 資料庫執行它（需要 `psql`）：

```bash
cd e2e && npm ci && npx playwright install chromium
SCOPEWEAVER_URL=http://127.0.0.1:8787 ARTEX_PG_DSN=postgres://.../scopeweaver_test_e2e npm run smoke
```

請在 PR 中說明你執行了什麼，以及有哪些是你無法執行的。

## 審閱與合併

1. CI 必須通過：`frontend`、`agent-adapter` 與 `backend` 檢查，以及 `e2e` 煙霧測試。對首次貢獻者，CI
   的執行由維護者核准。
2. PR 會依其 diff 審閱正確性、安全性，以及英文／韓文的對齊一致性。
3. **合併前，維護者會對每個 PR 做最後的人工檢查。** 沒有這道程序就不會合併。

發行版由維護者在合併前後完成完整端對端測試後才切出。
</content>
