"""
BooYeahShop logotipini PNG dan SVG yo'llariga o'giradi.

Brend fayllari o'zgarsa shuni qayta ishga tushiring — natijada
boyeah-logo-paths.js va splash.html ichidagi SVG yangilanadi.

    pip install potracer pillow numpy
    python3 logotipni-ogirish.py IMG_7325.PNG IMG_7326.PNG <chiqish-papkasi>

IMG_7325.PNG — sumka belgisi (korpus + dasta)
IMG_7326.PNG — BooYeahShop yozuvi

Dasta alohida ajratiladi: uning markaziy chizig'i aylanaga moslanib
o'lchanadi, shunda uni "chizilayotgan" qilib animatsiya qilish mumkin.
"""
import sys, json
import numpy as np
from PIL import Image
import potrace

mark_src, word_src, outdir = sys.argv[1], sys.argv[2], sys.argv[3]

def masks(path):
    im = Image.open(path).convert("RGBA")
    a = np.asarray(im).astype(np.int16)
    r,g,b,al = a[...,0],a[...,1],a[...,2],a[...,3]
    orange = (al>128)&(r>150)&(b<150)&(r-b>60)&(g<r-30)
    lum = (r*0.299+g*0.587+b*0.114)
    navy   = (al>128)&(lum<150)&(~orange)
    return orange, navy

def fmt(v):
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return s if s not in ("-0","") else "0"

def seg_pts(c):
    pts=[(c.start_point.x,c.start_point.y)]
    for seg in c:
        if seg.is_corner: pts += [(seg.c.x,seg.c.y),(seg.end_point.x,seg.end_point.y)]
        else: pts += [(seg.c1.x,seg.c1.y),(seg.c2.x,seg.c2.y),(seg.end_point.x,seg.end_point.y)]
    return pts

def trace(mask, ox, oy, s, turd=15):
    H, W = mask.shape
    p = potrace.Bitmap(mask).trace(turdsize=turd, alphamax=1.0, opticurve=1, opttolerance=0.2)
    def X(v): return fmt((v-ox)*s)
    def Y(v): return fmt((v-oy)*s)
    out=[]
    for c in p.curves:
        pts = seg_pts(c)
        xs=[q[0] for q in pts]; ys=[q[1] for q in pts]
        # drop the full-canvas outline artifact
        if (max(xs)-min(xs)) >= 0.97*W and (max(ys)-min(ys)) >= 0.97*H:
            continue
        d=[f"M{X(c.start_point.x)} {Y(c.start_point.y)}"]
        for seg in c:
            if seg.is_corner:
                d.append(f"L{X(seg.c.x)} {Y(seg.c.y)}L{X(seg.end_point.x)} {Y(seg.end_point.y)}")
            else:
                d.append(f"C{X(seg.c1.x)} {Y(seg.c1.y)} {X(seg.c2.x)} {Y(seg.c2.y)} {X(seg.end_point.x)} {Y(seg.end_point.y)}")
        d.append("Z")
        out.append("".join(d))
    return out

# ---------- MARK ----------
orange, _ = masks(mark_src)
ys,xs = np.nonzero(orange)
mx0,mx1,my0,my1 = xs.min(),xs.max(),ys.min(),ys.max()
S = 100.0/(mx1-mx0)
VBH = (my1-my0)*S

bag_top_px = my0 + 27.78/S
bag_mask = orange.copy(); bag_mask[:int(bag_top_px)-2,:] = False
bag_paths = trace(bag_mask, mx0, my0, S, turd=15)
bag_d = "".join(bag_paths)

# handle centerline (fitted circle)
HC_X, HC_Y, HR, HW = 52.47, 22.46, 18.93, 5.7
ey = 29.6
dx = (HR**2 - (ey-HC_Y)**2) ** 0.5
handle_d = f"M{fmt(HC_X-dx)} {fmt(ey)}A{fmt(HR)} {fmt(HR)} 0 0 1 {fmt(HC_X+dx)} {fmt(ey)}"

# ---------- WORDMARK ----------
worange, wnavy = masks(word_src)
nys,nxs = np.nonzero(wnavy)
by0, by1 = nys.min(), nys.max()
band = np.zeros_like(worange); band[by0-14:by1+34, :] = True
wo = worange & band
oys,oxs = np.nonzero(wo)
wx0 = min(nxs.min(), oxs.min()); wx1 = max(nxs.max(), oxs.max())
wy0 = min(nys.min(), oys.min()); wy1 = max(nys.max(), oys.max())
WS = 100.0/(wx1-wx0); WVBH = (wy1-wy0)*WS

navy_d   = "".join(trace(wnavy, wx0, wy0, WS, turd=8))
shop_d   = "".join(trace(wo,    wx0, wy0, WS, turd=8))

meta = {
 "mark":  {"viewBox": f"0 0 100 {fmt(VBH)}", "handle": {"cx":HC_X,"cy":HC_Y,"r":HR,"w":HW}},
 "word":  {"viewBox": f"0 0 100 {fmt(WVBH)}"},
}
print(json.dumps(meta, indent=1))
print("bag d len", len(bag_d), "navy d len", len(navy_d), "shop d len", len(shop_d))

open(f"{outdir}/paths.json","w").write(json.dumps({
  "markViewBox": f"0 0 100 {fmt(VBH)}", "bag": bag_d, "handle": handle_d,
  "handleStroke": HW,
  "wordViewBox": f"0 0 100 {fmt(WVBH)}", "wordNavy": navy_d, "wordShop": shop_d,
}, indent=1))

# Ko'rib chiqish uchun tekshiruv fayllari (ixtiyoriy)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 {fmt(VBH)}" width="400">
<path fill="none" stroke="#FF6A13" stroke-width="{fmt(HW)}" d="{handle_d}"/>
<path fill="#FF6A13" fill-rule="evenodd" d="{bag_d}"/>
</svg>'''
open(f"{outdir}/check-mark.svg","w").write(svg)

wsvg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 {fmt(WVBH)}" width="700">
<path fill="#1F2D3D" fill-rule="evenodd" d="{navy_d}"/>
<path fill="#FF6A13" fill-rule="evenodd" d="{shop_d}"/>
</svg>'''
open(f"{outdir}/check-word.svg","w").write(wsvg)
print("ok")
