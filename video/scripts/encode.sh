#!/usr/bin/env bash
# Junta os frames renderizados e a mistura num MP4 (H.264 + AAC), gera uma versão leve e a capa.
#   bash scripts/encode.sh 9x16|16x9
set -euo pipefail
cd "$(dirname "$0")/.."
fmt="${1:?formato: 9x16 ou 16x9}"
fps=$(node -p "require('./timeline.json').fps")
dur=$(node -p "require('./timeline.json').duration")
cover_t=$(node -p "const t=require('./timeline.json');(t.scenes.find(s=>s.id==='cta').start+5).toFixed(2)")
out="out/BomPaladar_Anuncio_${fmt}.mp4"
ffmpeg -v error -stats -y -framerate "$fps" -i "out/${fmt}/frames/f%05d.jpg" -i out/mix.wav \
  -map 0:v -map 1:a -t "$dur" \
  -c:v libx264 -preset slow -crf 17 -profile:v high -pix_fmt yuv420p -r "$fps" \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart "$out"
# Versão HD para partilhar (1080p, duas passagens, ~27 MB: cabe nos limites de 30 MB)
plog="out/${fmt}/x264pass"
ffmpeg -v error -y -i "$out" -c:v libx264 -preset slow -b:v 3000k -pass 1 -passlogfile "$plog" -an -f null -
ffmpeg -v error -y -i "$out" -c:v libx264 -preset slow -b:v 3000k -pass 2 -passlogfile "$plog" -pix_fmt yuv420p \
  -c:a aac -b:a 160k -movflags +faststart "out/BomPaladar_Anuncio_${fmt}_HD.mp4"
# Versão leve para WhatsApp/redes (720p, ~9 MB)
scale=$([ "$fmt" = 9x16 ] && echo 720:1280 || echo 1280:720)
ffmpeg -v error -y -i "$out" -vf "scale=$scale:flags=lanczos" -c:v libx264 -preset slow -crf 23 -maxrate 1.9M -bufsize 3.8M \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "out/BomPaladar_Anuncio_${fmt}_leve.mp4"
ffmpeg -v error -y -ss "$cover_t" -i "$out" -frames:v 1 -q:v 2 "out/BomPaladar_Capa_${fmt}.jpg"
echo "$out"
