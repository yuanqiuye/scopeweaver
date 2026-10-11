// Assembles the per-namespace message modules into flat en/ko catalogs.
// Keys are "<namespace>.<key>". Every namespace module types its Korean table
// as Record<keyof typeof en, string>, so a missing or extra Korean entry is a
// compile error; i18n.test.mjs additionally checks placeholder/tag parity.

import * as app from "./messages/app.ts";
import * as common from "./messages/common.ts";
import * as english from "./messages/english.ts";
import * as interfaceMessages from "./messages/interface.ts";
import * as providers from "./messages/providers.ts";
import * as settings from "./messages/settings.ts";
import { zhTw as appZh } from "./messages/zhtw/app.ts";
import { zhTw as commonZh } from "./messages/zhtw/common.ts";
import { zhTw as englishZh } from "./messages/zhtw/english.ts";
import { zhTw as interfaceZh } from "./messages/zhtw/interface.ts";
import { zhTw as providersZh } from "./messages/zhtw/providers.ts";
import { zhTw as settingsZh } from "./messages/zhtw/settings.ts";

const namespaces = {
  providers,
  settings,
  english,
  interface: interfaceMessages,
  app,
  common,
};

// Traditional Chinese (zh-TW) tables, one per namespace. Each is typed as
// Record<keyof typeof en, string> in its module, so a missing or extra key is
// a compile error — the same parity guarantee the en/ko modules carry.
const zhTables: Record<NamespaceName, Record<string, string>> = {
  providers: providersZh,
  settings: settingsZh,
  english: englishZh,
  interface: interfaceZh,
  app: appZh,
  common: commonZh,
};

type Namespaces = typeof namespaces;
type NamespaceName = keyof Namespaces & string;

export type MessageKey = {
  [N in NamespaceName]: `${N}.${keyof Namespaces[N]["en"] & string}`;
}[NamespaceName];

export type Catalog = Record<MessageKey, string>;

function flatten(locale: "en" | "ko"): Catalog {
  const out: Record<string, string> = {};
  for (const [ns, mod] of Object.entries(namespaces)) {
    for (const [key, value] of Object.entries(mod[locale] as Record<string, string>)) out[`${ns}.${key}`] = value;
  }
  return out as Catalog;
}

function flattenZh(): Catalog {
  const out: Record<string, string> = {};
  for (const [ns, table] of Object.entries(zhTables)) {
    for (const [key, value] of Object.entries(table)) out[`${ns}.${key}`] = value;
  }
  return out as Catalog;
}

export const catalogs = { en: flatten("en"), ko: flatten("ko"), "zh-TW": flattenZh() } as const;

export const namespaceNames = Object.keys(namespaces);
