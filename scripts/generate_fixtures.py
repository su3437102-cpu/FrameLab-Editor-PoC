#!/usr/bin/env python3
"""Regenerate synthetic test images (Pillow required); see evidence/fixtures-sha256.json."""
from PIL import Image, ImageDraw
from pathlib import Path
f = Path(__file__).resolve().parent.parent / "fixtures"
f.mkdir(exist_ok=True)
im = Image.new("RGBA", (3240, 3240), (240, 240, 240, 255))
d = ImageDraw.Draw(im)
for y in range(3):
    for x in range(3):
        d.rectangle((x*1080,y*1080,(x+1)*1080-1,(y+1)*1080-1),fill=(50+x*65,50+y*65,140,255))
        d.text((x*1080+20,y*1080+20),f"{y*3+x+1}: {x*1080},{y*1080}",fill="white",font_size=54)
d.rectangle((700,600,2600,2200),outline="white",width=35)
d.line((0,300,3240,2940),fill="red",width=17)
im.save(f/"grid-3240.png")
im.convert("RGB").save(f/"grid-3240.jpg",quality=95)
Image.linear_gradient("L").resize((3240,3240)).save(f/"mask-gradient.png")
a=Image.new("RGBA",(800,800),(255,170,0,0))
ImageDraw.Draw(a).ellipse((30,30,770,770),fill=(255,170,0,128))
a.save(f/"alpha-circle.png")
for y in range(3):
    for x in range(3):
        im.crop((1080*x,1080*y,1080*(x+1),1080*(y+1))).save(f/f"expected-{y*3+x+1}.png")
print("Generated fixtures; bytes may differ by Pillow/font version.")
