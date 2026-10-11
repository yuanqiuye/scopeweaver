# ScopeWeaver v0.3.0 — Traditional Chinese (zh-TW) localization

## Added

- **Traditional Chinese (zh-TW, Taiwan usage) as a first-class language.** The full interface, backend message catalog, and all built-in LLM prompt templates (planner, worker, main agent, reporter, retester, the command-interception safety-reviewer prompts, and the wrap-up / budget-expiry notices) are translated. The language selector offers 繁體中文, and request negotiation resolves Traditional variants (zh-TW, zh-Hant, zh-HK, zh-MO) to zh-TW while leaving Simplified or unmarked Chinese (zh-CN, zh-Hans, bare zh) unselected, so a Simplified preference never silently selects Traditional.
- **Traditional Chinese shipped as the default language.** A fresh install presents zh-TW in both the UI and server output with no configuration. English and Korean remain fully supported and are selected automatically from a stored preference, cookie, `Accept-Language` header, or the `SCOPEWEAVER_LANGUAGE` / `ARTEX_LANGUAGE` environment variable and operator setting. A per-message fallback to English is retained, so any individual string without a zh-TW translation degrades to English rather than to a blank.
- **Traditional Chinese documentation.** `README.zh-TW.md`, `CONTRIBUTING.zh-TW.md`, and a `docs/zh-TW/` set mirror the existing English and Korean documentation, with cross-language links added to the other READMEs.

## Downloads

Platform ZIP archives target Linux amd64/arm64, macOS amd64/arm64, and Windows amd64, with `SHA256SUMS`.

## 繁體中文

### 新增

- **繁體中文（zh-TW，台灣用語）成為一等語言。** 完整的介面、後端訊息目錄，以及所有內建的 LLM 提示詞模板（規劃者、執行者、主代理、報告產生器、重測、指令攔截的安全審查提示，以及收尾／預算到期通知）都已翻譯。語言切換器新增「繁體中文」，請求協商會將繁體變體（zh-TW、zh-Hant、zh-HK、zh-MO）對應到 zh-TW，而簡體或未標記的中文（zh-CN、zh-Hans、單純 zh）則不會被選取，因此簡體偏好永遠不會默默選到繁體。
- **繁體中文設為預設語言。** 全新安裝不需任何設定，前端介面與後端輸出都會是繁體中文。英文與韓文仍完整支援，並會依使用者偏好、cookie、`Accept-Language` 標頭，或 `SCOPEWEAVER_LANGUAGE` / `ARTEX_LANGUAGE` 環境變數與操作者設定自動切換。保留逐則訊息回退英文的機制，因此任何尚無繁中翻譯的字串會退回英文，而非顯示空白。
- **繁體中文文件。** 新增 `README.zh-TW.md`、`CONTRIBUTING.zh-TW.md` 與 `docs/zh-TW/`，對應既有的英文與韓文文件，並在其他 README 加上跨語言連結。

## 한국어

### 추가

- **번체 중국어(zh-TW, 대만 표기)를 1급 언어로 지원.** 전체 인터페이스, 백엔드 메시지 카탈로그, 모든 내장 LLM 프롬프트 템플릿(플래너, 워커, 메인 에이전트, 리포터, 재검증, 명령 가로채기 안전 검토 프롬프트, 마무리/예산 만료 알림)을 번역했습니다. 언어 선택기에 繁體中文이 추가되며, 요청 협상은 번체 변형(zh-TW, zh-Hant, zh-HK, zh-MO)을 zh-TW로 해석하고 간체 또는 미표기 중국어(zh-CN, zh-Hans, 단순 zh)는 선택하지 않습니다.
- **번체 중국어를 기본 언어로 제공.** 새 설치는 설정 없이 UI와 서버 출력 모두 zh-TW로 표시됩니다. 영어와 한국어는 계속 완전히 지원되며 저장된 기본 설정, 쿠키, `Accept-Language` 헤더, `SCOPEWEAVER_LANGUAGE` / `ARTEX_LANGUAGE` 환경 변수 및 운영자 설정에서 자동 선택됩니다. 메시지별 영어 폴백이 유지되어 zh-TW 번역이 없는 문자열은 공백 대신 영어로 표시됩니다.
- **번체 중국어 문서.** `README.zh-TW.md`, `CONTRIBUTING.zh-TW.md`, `docs/zh-TW/` 세트가 기존 영어/한국어 문서를 반영하며, 다른 README에 언어 간 링크를 추가했습니다.
