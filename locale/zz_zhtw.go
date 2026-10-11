package locale

import (
	_ "embed"
	"encoding/json"
)

// zhtwData holds the Traditional Chinese (Taiwan) translations for backend
// message catalog keys. Keys are the exact English catalog keys (which are the
// English source strings themselves). Entries are filled in incrementally; any
// key absent here falls back to English via Lookup, so a partial file is safe.
//
//go:embed zhtw.json
var zhtwData []byte

func init() {
	var entries map[string]string
	if err := json.Unmarshal(zhtwData, &entries); err != nil {
		// A malformed translation file must never take down the server; English
		// remains the fallback for every key.
		return
	}
	RegisterAllZhTW(entries)
}
