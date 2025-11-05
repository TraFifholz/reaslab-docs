---
title: Troubleshooting
---

# Troubleshooting

Run into a hiccup? These tips cover the most common issues when working in Reaslab.

## Infoview looks stale

- Use the refresh button in the Infoview to restart analysis for the current file.
- Confirm that the status indicator shows you are connected; reconnecting may take a moment after a network interruption.

## Missing diagnostics

- Wait for Lean LSP responses to arrive—diagnostics appear inline and in the Infoview.
- Make sure your latest edits have synchronized; a brief pause after typing can help the analyzer catch up.

## Connection issues

- Watch the status indicator in the top bar; Reaslab attempts to reconnect automatically.
- If the connection remains offline, reload the page to start a fresh session.

## Read-only definitions

- Definitions from dependencies open in a read-only viewer dialog by design.
- Use hover or go to definition to inspect them without changing the source.

## Entering symbols

- Prefer backslash abbreviations to insert Unicode symbols quickly (`\\to`, `\\alpha`, and so on).
- Open the Symbols Palette if you need to browse available symbols visually.
