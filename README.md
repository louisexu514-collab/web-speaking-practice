# 网页版随身口语练习 · FluentBridge（外企英语表达训练系统）

> 在线体验（GitHub Pages）：https://louisexu514-collab.github.io/web-speaking-practice/

一个面向外企求职者、外贸从业者和外企职场人的英语表达训练系统原型。
不是背单词工具：它把 PDF 题库、口语书、面试话题拆解为「话题库 → 中文思路 → 重点词汇 → 句型句式 → 三级回答 → 追问训练 → 录音复盘」的完整表达资产闭环。

> 当前为纯前端原型：所有 "AI 解析 / 录音 / 反馈" 均为本地模拟，不连接任何后端。

## 运行

```bash
cd fluentbridge
npm install
npm run dev      # http://localhost:5174
```

生产构建：`npm run build && npm run preview`

## 技术栈

- React 18 + TypeScript + Vite
- Tailwind CSS v4（`@tailwindcss/vite`，主题 token 见 `src/index.css`）
- lucide-react 图标
- 手写 shadcn/ui 风格组件（`src/components/ui.tsx`：Button / Card / Badge / Tabs / Modal / Progress / RingGauge / Select …）
- 状态：`src/state/AppState.tsx`（Context + localStorage 持久化，侧边栏底部可一键 Reset demo data）

## 页面（9 个）

| 页面 | 说明 |
| --- | --- |
| Dashboard | 今日任务（可点击进入训练）、三个核心入口、学习资产概览、周进度环 |
| Upload Analyzer | 拖拽/示例文件 → 5 步解析动画 → Analysis Summary + 话题簇表格 → Save to Library / Generate 7-day Plan |
| Topic Generator | 任意话题 → 诊断、中文思路、词汇表、句型、Basic/Standard/Advanced 三级回答、追问、训练任务 |
| Topic Library | 多维表格：搜索 + Scenario/Role/Difficulty/Framework/Status/Source 六维筛选，行点击进话题详情 |
| Training Plan | 30 天课程地图：4 周 × 7 天卡片，已完成/今日/锁定三态，点击进入训练室 |
| Practice Room | Read/Keyword/Free 三模式，模拟录音（开始/暂停/停止/波形/计时）→ AI 反馈弹窗 → 保存/再来/完成任务 |
| Review Tracker | 数据卡、五维能力条、练习历史表、表达银行 |
| Template Center | 7 类模板卡，Copy（Toast）/ Save / Add to Practice |
| Profile | 目标岗位/公司/水平/时长/弱点/场景设置，保存后重建 Dashboard 今日任务 |

## 已实现的 15 项核心交互

1. 左侧导航切换页面
2. Dashboard 今日任务点击进入 Practice Room
3. Upload Analyzer 示例文件点击后显示解析进度
4. 解析完成后保存到 Topic Library（话题去重入库）
5. Topic Generator 输入话题后生成完整话题卡（命中内置话题时复用精编内容，否则模板合成）
6. 生成的话题可保存到 Topic Library
7. Topic Library 可搜索、筛选、点击查看详情
8. Training Plan 点击任意 Day 卡片进入 Practice Room
9. Practice Room 模拟录音开始 / 暂停 / 恢复 / 停止（到时自动停止）
10. 停止录音后弹出模拟 AI Feedback（流利度/逻辑/职业语气/结构/升级表达）
11. Feedback 保存后进入 Review Tracker（历史表 + 表达银行联动）
12. Template Center Copy 按钮 + Toast
13. Profile 保存后 Dashboard 目标与今日任务按新弱点重建
14. Mark as Mastered 改变话题状态（详情页与列表同步）
15. Add to Today's Practice 增加 Dashboard 今日任务（顶栏计数联动）

## Mock 数据

`src/data/mockData.ts` 预置 15 个完整话题（Self-introduction / Project Experience / Conflict Resolution / Price Negotiation / Business Travel Emergency 等，每个含词汇表、句型、三级回答、追问、训练任务）、14 个模板、30 天计划、练习历史与表达银行种子数据。

## 接入真实 AI 的路径（后续）

1. **文件解析**：`UploadAnalyzer` 的模拟管线替换为后端任务 —— pdf.js 抽取文本（扫描件走 OCR），LLM 按话题聚类、生成词汇/句型/任务，接口返回 `Topic[]` 后仍走现有 `addTopics()` 入库。
2. **话题生成**：`src/lib/topicFactory.ts` 的模板合成替换为 LLM 调用（同样的 `Topic` schema，前端零改动）。
3. **录音与评分**：`PracticeRoom` 中模拟录音状态机替换为 MediaRecorder + Web Speech / Whisper 转写，评分走 LLM rubric，返回 `Feedback` schema。
4. **账号与同步**：`AppState` 的 localStorage 持久化替换为 API 读写即可，数据结构已按可序列化设计。
