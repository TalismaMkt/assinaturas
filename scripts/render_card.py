#!/usr/bin/env python3
import argparse, textwrap
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1080, 1350

PALETTE = {
    "black": "#0B0B0B",
    "white": "#FFFFFF",
    "blue": "#1E3A8A",
    "orange": "#F97316",
    "gray": "#9CA3AF",
}

FONT_PATH = "/root/.openclaw/workspace/assets/fonts/Inter-Regular.ttf"

def wrap_text(text, font, max_width):
    words = text.split()
    lines = []
    cur = []
    for w in words:
        cur.append(w)
        line = " ".join(cur)
        if font.getlength(line) > max_width:
            cur.pop()
            if cur:
                lines.append(" ".join(cur))
            cur = [w]
    if cur:
        lines.append(" ".join(cur))
    return lines


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--hook", required=True)
    ap.add_argument("--sub", required=True)
    ap.add_argument("--brand", default="QConverte")
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    img = Image.new("RGB", (WIDTH, HEIGHT), PALETTE["black"])
    draw = ImageDraw.Draw(img)

    # Brand
    brand_font = ImageFont.truetype(FONT_PATH, 36)
    draw.text((80, 60), args.brand.upper(), fill=PALETTE["blue"], font=brand_font)

    # Hook
    hook_font_size = 84
    hook_font = ImageFont.truetype(FONT_PATH, hook_font_size)
    max_width = WIDTH - 160
    hook_lines = wrap_text(args.hook, hook_font, max_width)
    while len(hook_lines) > 4 and hook_font_size > 56:
        hook_font_size -= 6
        hook_font = ImageFont.truetype(FONT_PATH, hook_font_size)
        hook_lines = wrap_text(args.hook, hook_font, max_width)

    y = 180
    for line in hook_lines:
        draw.text((80, y), line, fill=PALETTE["white"], font=hook_font)
        y += hook_font_size + 8

    # Subheadline with bullet
    sub_font = ImageFont.truetype(FONT_PATH, 40)
    bullet = "•"
    sub_lines = wrap_text(args.sub, sub_font, max_width-50)
    y += 40
    for i, line in enumerate(sub_lines):
        if i == 0:
            draw.text((80, y), bullet, fill=PALETTE["orange"], font=sub_font)
            draw.text((110, y), line, fill=PALETTE["gray"], font=sub_font)
        else:
            draw.text((110, y), line, fill=PALETTE["gray"], font=sub_font)
        y += 48

    img.save(args.out)

if __name__ == "__main__":
    main()
