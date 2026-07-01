// Server-side ceiling for alert pick limits.
// The real business limit is controlled by max_picks in scan_config.json
// (fetched from GitHub by the extension). This constant is a safety cap
// to prevent abuse — set generously above the expected config value.
//
// EXPIRES_DAYS is reserved — currently the alert_configs.expires_at column
// has its own SQL DEFAULT (now() + interval '180 days'). If a future change
// wants the Edge Function to set expires_at explicitly on insert, this is
// where the value lives.

export const MAX_PICKS = 12;
export const EXPIRES_DAYS = 180;

// Per-license overrides for users who purchased extra alert slots.
// Hash -> limit. Short handle comments only (no PII).
const PICKS_OVERRIDES: Record<string, number> = {
  "95db5c16de55b58959bb6e84db8368b453ed3a614a8fb6d869f82d7660b561ed": 104, // thiago
  "ca369e7667758949cbc8d6cdb9ca23e6f58498ad6738b2c57d655651b3270b8f": 104, // nav
  "fbfe183816b7653281419504f887e0e5bbcb66f0df434e6d03910615e532216d": 15,  // prest
};

export function getMaxPicks(licenseHash: string): number {
  return PICKS_OVERRIDES[licenseHash] ?? MAX_PICKS;
}
