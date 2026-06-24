---
name: editorial-carousel-nano-banana
description: Generate editorial-style carousel background images using Nano Banana. Use for creating carousel backgrounds (5–10 slides) with clean editorial aesthetics and text-safe space for overlays.
---

# Editorial Carousel (Nano Banana)

Generate editorial‑style carousel background images using the Nano Banana image model. Designed for clean, magazine‑like layouts with generous white space for text overlays.

## What it does
- Produces a set of background images (5 or 10 slides)
- Consistent editorial look (neutral palette, soft light, minimal clutter)
- Each image reserves space for text overlay

## Requirements
- Nano Banana skill installed: `nanophoto-nano-banana-pro`
- Environment variable: `NANOPHOTO_API_KEY`

## Usage

### Generate 5 editorial backgrounds
```bash
python3 /root/.openclaw/workspace/skills/editorial-carousel-nano-banana/scripts/generate_carousel.py \
  --topic "Duplicata escritural" \
  --count 5 \
  --out /root/.openclaw/workspace/carousels/dup_escritural
```

### Generate 10 editorial backgrounds
```bash
python3 /root/.openclaw/workspace/skills/editorial-carousel-nano-banana/scripts/generate_carousel.py \
  --topic "Fluxo de caixa para PMEs" \
  --count 10 \
  --out /root/.openclaw/workspace/carousels/fluxo_caixa
```

## Notes
- These are **background images**. Add text overlays in your design tool or automated pipeline.
- If you need text baked into images, pair with a compositor (Pillow/HTML→image).
- Default aspect ratio: 1:1 (1080x1080). Change with `--aspect` if needed.
