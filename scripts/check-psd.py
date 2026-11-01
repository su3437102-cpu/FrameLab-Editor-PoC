from psd_tools import PSDImage
from PIL import Image
import json, pathlib
p=pathlib.Path('evidence/custom')
psd=PSDImage.open(p/'fixture.psd')
assert psd.size == (3240,3240), psd.size
layer=next(x for x in psd if x.name=='Cross')
assert layer.has_mask()
actual=psd.composite(force=True).convert('RGBA')
expected=Image.open(p/'composite.png').convert('RGBA')
checks=[]
for xy in [(800,1000),(1200,1000),(2500,1100),(1080,1000),(2160,1000),(0,0)]:
    a=actual.getpixel(xy); b=expected.getpixel(xy)
    checks.append({'xy':xy,'external':a,'pikado':b,'max_delta':max(abs(x-y) for x,y in zip(a,b))})
result={'parser':'psd-tools','size':psd.size,'mask':layer.has_mask(),'pixels':checks,'scope':'independent parser sample comparison; not Photoshop certification'}
(p/'external-psd.json').write_text(json.dumps(result,indent=2))
actual.save(p/'external-composite.png')
assert all(x['max_delta']<=1 for x in checks), result
