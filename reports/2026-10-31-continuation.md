# 补充记录：2026-10-31

- 固定 Pikado 版本在当前环境执行 npm run dev -- --host 127.0.0.1 --port 4173：Vite 报告 ready（168 ms）。这只证明进程启动日志，不能证明页面已打开。
- 可用浏览器访问 http://127.0.0.1:4173 返回 ERR_CONNECTION_REFUSED；另一个命令执行环境访问相同地址亦返回连接拒绝。环境进程/网络隔离的具体机制未确认，不能断言单一原因。
- 本轮重跑 scripts/pikado-node.mjs：路径 JSON 深复制、曲线几何和 3240×3240 选区数组深复制均通过。
- 本轮重跑 scripts/fabric-headless.cjs：对象新增、逆 Step 撤销、纯 Doc JSON 往返及重复 ID 拒绝通过。
- 此次没有截图、浏览器实际交互、图层蒙版合成、PSD、九宫格导出和性能结果。其状态保持未测。
- 新增 scripts/generate_fixtures.py 可用 Pillow 生成合成素材；不同 Pillow 和字体环境可能产生不同字节，精确对比应使用原证据包中的素材及 SHA256。
- 正式 FrameLab 仓库保持冻结；没有集成。
