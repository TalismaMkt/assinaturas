#!/usr/bin/env python3
import argparse, os, subprocess, json, requests, textwrap

NANO_SCRIPT = "/root/.openclaw/workspace/skills/nanophoto-nano-banana-pro/scripts/nano_banana_generate.py"

BASE_PROMPT = (
    "editorial magazine style, clean minimal layout, neutral palette, soft natural light, "
    "modern office or abstract business texture, generous empty space for text overlay, "
    "no text, no logos, high-end editorial aesthetic"
)

VARIATIONS = [
    "soft gradients and paper texture",
    "minimal desk scene with notebook and pen",
    "abstract geometric shapes with subtle shadows",
    "clean office interior with blurred background",
    "light beams and soft vignette",
    "minimalist grid and subtle lines",
    "warm neutral tones with depth",
    "cool neutral tones with depth",
    "clean concrete texture",
    "simple fabric texture"
]


def run(prompt, aspect, quality):
    cmd = [
        "python3", NANO_SCRIPT,
        "--prompt", prompt,
        "--mode", "generate",
        "--aspect-ratio", aspect,
        "--image-quality", quality
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, env=os.environ.copy())
    if res.returncode != 0:
        raise RuntimeError(res.stderr.strip() or res.stdout.strip())
    # last JSON line
    lines = [l for l in res.stdout.splitlines() if l.strip().startswith("{")]
    data = json.loads(lines[-1])
    url = data.get("imageUrl") or data.get("image_url") or data.get("result", {}).get("imageUrl")
    if not url:
        raise RuntimeError("No imageUrl in response")
    return url


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--topic", required=True)
    ap.add_argument("--count", type=int, default=5)
    ap.add_argument("--out", required=True)
    ap.add_argument("--aspect", default="1:1")
    ap.add_argument("--quality", default="2K")
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)

    for i in range(args.count):
        var = VARIATIONS[i % len(VARIATIONS)]
        prompt = f"{BASE_PROMPT}, topic: {args.topic}, {var}"
        url = run(prompt, args.aspect, args.quality)
        img = requests.get(url, timeout=60).content
        path = os.path.join(args.out, f"slide_{i+1:02d}.png")
        with open(path, "wb") as f:
            f.write(img)
        print(path)

if __name__ == "__main__":
    main()
