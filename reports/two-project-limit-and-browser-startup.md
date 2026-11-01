# 两项目上限与网页启动验证

用户约束：正式集成最多取自两个候选项目。原五项目比较仍有效，但不允许将多个完整编辑器拼接。

本轮新增真实Chromium启动检查：miniPaint与Fabritor在运行41296758627成功；Fabric Photo第一次因/fabric-photo/资源前缀未正确托管，JS/CSS 404，body为空（测试配置失败）。修正静态托管映射后，在41296864989成功。该检查要求body文本长度≥40且无pageerror并保存截图；它仅是启动冒烟，不是工具交互、素材编辑或性能验收。

- https://github.com/su3437102-cpu/FrameLab-Editor-PoC/actions/runs/41296758627
- https://github.com/su3437102-cpu/FrameLab-Editor-PoC/actions/runs/41296864989

首选路线仍为一个Pikado图片内核，统一EditorService与内核历史；第二个项目只有在确认缺口且独立模块可用时启用。两种互斥选择：
1. 若主要缺口是对象编辑/排版：Pikado + Fabric Photo中经验证的纯对象/几何模块。不得引入第二套可变文档或History，仍需做API适配PoC。
2. 若主要缺口是PSD/PSB格式覆盖：Pikado + PhotoCraft独立格式crate。必须完成WASM桥接与Doc转换测试，不能把crate测试通过当完整浏览器可用。
不能同时选1和2，也不计入miniPaint/Fabritor第三方提取代码。架构思想参考不等于复制代码；若复制实际代码就计入来源数并保留许可。

目前尚无足够独立适配证据指定第二个项目，建议先批准单核方向、保留第二席，而不是先选两个再处理数据冲突。没有正式集成或修改V1 UI。

全部未测试内容尚未完成：真实钢笔操作、蒙版变换/羽化、完整原生保存恢复、复杂PSD/字体/色彩、编辑器九宫格导出、性能与移动端、跨核适配和V1回归仍需执行。此记录不能作为最终全功能验收。
