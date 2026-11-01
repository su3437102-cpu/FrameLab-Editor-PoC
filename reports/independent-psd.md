# 独立PSD验证

运行：https://github.com/su3437102-cpu/FrameLab-Editor-PoC/actions/runs/41286147231

Pikado固定提交29f6d8902a91f089edc8b327ab311ffa44859023导出的实际PSD，由psd-tools 1.10.9独立解析并重合成。验证3240×3240画布、Cross图层及蒙版存在。比较(800,1000)、(1200,1000)、(2500,1100)、(1080,1000)、(2160,1000)、(0,0)六处RGBA，全部最大通道差为0。

证据产物包含fixture.psd、composite.png、external-composite.png、external-psd.json。保存30天。该结论只覆盖白底红矩形和黑白图层蒙版的六点采样；未覆盖复杂PSD、渐变、文字、完整像素、Photoshop打开或所有功能验收。
