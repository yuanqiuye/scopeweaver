package server

import (
	_ "embed"
	"encoding/json"

	"github.com/Autumn-27/artex/locale"
)

// zhtwPromptData holds Traditional Chinese (Taiwan) translations for this
// package's built-in prompt templates. Keys are the exact English source
// strings used as catalog keys by the locale.Register calls in this package.
// Any key absent here falls back to English via locale.Lookup, so a partial
// file is safe. init runs after the Register calls above have populated En/Ko.
//
//go:embed zhtw_prompts.json
var zhtwPromptData []byte

func init() {
	var entries map[string]string
	if err := json.Unmarshal(zhtwPromptData, &entries); err != nil {
		return
	}
	locale.RegisterAllZhTW(entries)
}
