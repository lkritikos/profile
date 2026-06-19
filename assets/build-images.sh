#!/usr/bin/env bash
#
# Regenerate the raster image assets (OG share card + apple-touch-icon) from the
# SVG sources in this directory. macOS-only: uses qlmanage (WebKit) to rasterize
# SVG and sips to crop. Run from anywhere:  bash assets/build-images.sh
#
# Sources of truth:
#   assets/og.svg          -> public/og.jpg            (1200x630, JPG ~10x smaller)
#   assets/og.svg letters  -> public/apple-touch-icon.png (180x180, full-bleed)
# The browser favicon (public/favicon.svg) ships as SVG and needs no rasterizing.
#
set -euo pipefail
cd "$(dirname "$0")/.."
ASSETS=assets
OUT=public

# --- OG card (1200x630) --------------------------------------------------------
# qlmanage pads every thumbnail to a square, so render the 1200x630 design
# vertically centered inside a 1200x1200 square (viewBox padding), then
# center-crop back to 1200x630. The temp file lives in assets/ so the relative
# @font-face url()s still resolve to assets/fonts/.
sed 's#width="1200" height="630" viewBox="0 0 1200 630"#width="1200" height="1200" viewBox="0 -285 1200 1200"#' \
  "$ASSETS/og.svg" > "$ASSETS/.og-render.svg"
qlmanage -t -s 1200 -o /tmp "$ASSETS/.og-render.svg" >/dev/null 2>&1
sips -c 630 1200 /tmp/.og-render.svg.png --out /tmp/.og-crop.png >/dev/null
# JPG at q82 is ~64K vs ~600K for PNG, with no visible artifacts at preview size.
sips -s format jpeg -s formatOptions 82 /tmp/.og-crop.png --out "$OUT/og.jpg" >/dev/null
rm -f "$ASSETS/.og-render.svg" /tmp/.og-render.svg.png /tmp/.og-crop.png

# --- apple-touch-icon (180x180, full-bleed) ------------------------------------
# iOS applies its own rounded mask, so the icon is full-bleed teal (no radius).
cat > "$ASSETS/.touch.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0d9488"/>
  <g fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 18 V46 H28"/>
    <path d="M37 18 V46 M37 32 L48 18 M37 32 L49 46"/>
  </g>
</svg>
SVG
qlmanage -t -s 180 -o /tmp "$ASSETS/.touch.svg" >/dev/null 2>&1
sips -c 180 180 /tmp/.touch.svg.png --out "$OUT/apple-touch-icon.png" >/dev/null
rm -f "$ASSETS/.touch.svg" /tmp/.touch.svg.png

echo "Wrote $OUT/og.jpg ($(sips -g pixelWidth -g pixelHeight "$OUT/og.jpg" | awk '/pixel/{print $2}' | paste -sd x -)) and $OUT/apple-touch-icon.png"
