// Minimal CSV builder — Excel/Sheets-safe quoting, no external dependency.

function escapeCell(value: unknown): string {
  const s = value == null ? '' : String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function toCsv<T extends Record<string, unknown>>(rows: T[], columns: { key: keyof T; label: string }[]): string {
  const header = columns.map(c => escapeCell(c.label)).join(',')
  const body   = rows.map(row => columns.map(c => escapeCell(row[c.key])).join(','))
  return [header, ...body].join('\r\n')
}

export function toBase64(csv: string): string {
  return Buffer.from(csv, 'utf-8').toString('base64')
}
