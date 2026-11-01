from psd_tools import PSDImage
from PIL import Image
import numpy as np
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
aa=np.asarray(actual).astype(np.int16)
bb=np.asarray(expected).astype(np.int16)
delta=np.abs(aa-bb)
full={'pixels':3240*3240,'different_pixels':int(np.count_nonzero(np.any(delta>0,axis=2))),'max_channel_delta':int(delta.max()),'mean_channel_delta':float(delta.mean())}
rebuilt=Image.new('RGBA',(3240,3240))
for y in range(3):
    for x in range(3):
        tile=expected.crop((x*1080,y*1080,(x+1)*1080,(y+1)*1080))
        tile.save(p/f'tile-{y*3+x+1}.png')
        rebuilt.paste(tile,(x*1080,y*1080))
assert np.array_equal(np.asarray(rebuilt),np.asarray(expected))
result={'full_image':full,'nine_tiles_reassemble_exactly':True,'parser':'psd-tools','size':psd.size,'mask':layer.has_mask(),'pixels':checks,'scope':'independent parser full-image comparison; tiles are reference Pillow crops, not editor UI exports'}
(p/'external-psd.json').write_text(json.dumps(result,indent=2))
actual.save(p/'external-composite.png')
assert full['max_channel_delta']<=1, result
