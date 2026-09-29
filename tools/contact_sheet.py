# -*- coding: utf-8 -*-
"""把导出的逐页 PNG 拼成 2×2 联系表，便于一眼扫版面问题。
python tools/contact_sheet.py shots/ [每张页数，默认 4]  → shots/_sheet_01.png …"""
import glob, os, sys
from PIL import Image

d = sys.argv[1] if len(sys.argv) > 1 else "shots"
n = int(sys.argv[2]) if len(sys.argv) > 2 else 4
files = sorted(f for f in glob.glob(os.path.join(d, "s*.png")))
cols = 2
W, H = 800, 450
for k in range(0, len(files), n):
    group = files[k:k + n]
    rows = (len(group) + cols - 1) // cols
    sheet = Image.new("RGB", (W * cols, H * rows), "white")
    for i, f in enumerate(group):
        sheet.paste(Image.open(f).convert("RGB").resize((W, H)), ((i % cols) * W, (i // cols) * H))
    out = os.path.join(d, f"_sheet_{k // n + 1:02d}.png")
    sheet.save(out)
    print(out, [os.path.basename(f) for f in group])
