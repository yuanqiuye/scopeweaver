# v0.2.1 授權聲明打包修復

[English](../release-notice-repair.md) · [한국어](../ko/release-notice-repair.md)

`repair-release-notices.yml` 是針對既有 v0.2.1 發行版的一次性手動修正。它會把
`THIRD_PARTY_NOTICES.txt` 加入五個已發佈的 ZIP，以及既有的 Linux amd64/arm64 映像檔。它會保留 Git tag、
每個原始壓縮檔項目、所有原始映像層，以及映像檔的執行階段設定。它不建置任何應用程式碼。在更動正式 tag
之前，輸入映像檔的 digest 必須與既有的 v0.2.1 及 latest tag 相符。

請僅在原本由 tag 觸發的發行 workflow（含其 Docker job）成功完成之後才派送（dispatch），以免它覆蓋這次
修正。請審閱修復 workflow，並確認目前不可變的 multiarch 映像檔 digest。此 workflow 使用其既有的
`GITHUB_TOKEN` 來處理發行資產與 GHCR；不需要變更任何個人 OAuth scope。它會發佈獨立的聲明檔、將原始的
checksum 檔保留為 `SHA256SUMS.original`，並把原始 ZIP、替換後的 ZIP、執行檔雜湊、各平台的
manifest／設定，以及兩個映像檔 digest，保留在 workflow artifact 中 30 天。維護者必須在發行說明中揭露
變更後的打包 checksum 與映像檔 digest。既有的應用程式版本與應用程式雜湊維持不變。

GitHub 資產替換與 registry tag 更新是分開的兩個操作。若在其中任一操作之後發佈失敗，**請勿針對已部分
變更的發行版重跑 workflow**。在保留的 workflow artifact 過期前先下載它。審閱
`archive-verification.json`、`image-verification.json`，以及原始／修正後的映像檔索引，以辨識哪一側已經
完成。以獲授權的維護者工作階段，完成同一套已驗證的修正：

```bash
# 從下載的 artifact 根目錄執行；先檢視 JSON 證據。
set -euo pipefail
assets="$(gh release view v0.2.1 --json assets --jq '.assets[].name')"
if grep -Fxq SHA256SUMS.original <<< "$assets"; then
  mkdir -p recovery-existing
  gh release download v0.2.1 --pattern SHA256SUMS.original --dir recovery-existing
  cmp repaired/SHA256SUMS.original recovery-existing/SHA256SUMS.original || exit 1
else
  gh release upload v0.2.1 repaired/SHA256SUMS.original
fi
gh release upload v0.2.1 THIRD_PARTY_NOTICES.txt --clobber
gh release upload v0.2.1 repaired/scopeweaver-0.2.1-*.zip repaired/SHA256SUMS --clobber
image=ghcr.io/cskwork/scopeweaver
digest="$(cat repaired/corrected-image-digest.txt)"
docker buildx imagetools create --tag "$image:v0.2.1" --tag "$image:latest" "$image@$digest"
```

接著重新下載已發佈的壓縮檔並執行 `sha256sum --check SHA256SUMS`；確認兩個 registry tag 都解析到所記錄
的修正後 digest。若維護者改為選擇還原原始打包，artifact 中的原始 ZIP 與 `image-verification.json` 裡的
`original_image_digest` 可提供回滾所需的輸入。請視需要在 artifact 過期後仍保存這次的修正證據。
</content>
