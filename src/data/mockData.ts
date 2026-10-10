import type {
  ExpressionItem,
  LessonTemplate,
  PracticeRecord,
  TodayTask,
  Topic,
  Profile,
} from "../types";

/* ------------------------------------------------------------------ */
/* 15 preset topics — full practice assets for each                    */
/* ------------------------------------------------------------------ */

export const initialTopics: Topic[] = [
  {
    id: "t-self-intro",
    topicName: "Self-introduction",
    scenario: "Interview",
    role: "General",
    difficulty: "Beginner",
    framework: "4-part intro",
    frameworkSteps: ["Background", "Highlight", "Value", "Anchor"],
    source: "Built-in",
    status: "Practiced",
    skillTested: "Structure, relevance, confidence under 60 seconds",
    chineseThinking:
      "面试官不是想听你的简历，而是想快速判断：你是谁、你最强的一点是什么、你能给团队带来什么。60 秒内讲完，别从小学开始报流水账。",
    answerPoints: [
      "背景：现在的角色 + 专业领域（一句话）",
      "亮点：一个最能代表你的成果或能力",
      "价值：你能为这个岗位解决什么问题",
      "锚点：为什么是现在、为什么是这家公司",
    ],
    relatedQuestions: [
      "Tell me about yourself.",
      "Walk me through your background.",
      "How would your colleagues describe you?",
      "What makes you a good fit for this role?",
    ],
    vocabulary: [
      { intent: "介绍自己", basic: "My name is... I work...", professional: "I'm currently a ... specializing in ..." },
      { intent: "有经验", basic: "I have done this for 3 years", professional: "I bring three years of hands-on experience in ..." },
      { intent: "擅长", basic: "I am good at design", professional: "My core strength lies in ..." },
      { intent: "带来价值", basic: "I can help the team", professional: "I can contribute to the team by ..." },
      { intent: "期待", basic: "I want to join your company", professional: "I'm looking for a role where I can ..." },
    ],
    sentencePatterns: [
      { stage: "Opening", pattern: "I'm currently a UX designer at a B2B SaaS company, focused on ..." },
      { stage: "Highlight", pattern: "One thing I'm most proud of is ..." },
      { stage: "Value", pattern: "What I can bring to this role is ..." },
      { stage: "Anchor", pattern: "That's why I'm excited about this position — it sits right at ..." },
    ],
    sampleAnswers: {
      basic: "My name is Louise. I am a UX designer. I have worked for 3 years. I like design and I want to join your company.",
      standard:
        "I'm Louise, a UX designer with three years of experience in B2B products. Most recently I led the redesign of our onboarding flow, which raised activation by 18%. I'm good at turning complex workflows into simple screens, and I hope to bring that skill to your product team.",
      advanced:
        "I'm Louise, a product-minded UX designer with three years in B2B SaaS. My recent focus has been onboarding and activation — I led a cross-functional redesign that lifted activation by 18% in one quarter. What I enjoy most is translating messy operational workflows into interfaces customers actually finish. That's exactly the problem space your team is investing in, which is why this role caught my attention.",
    },
    followUpQuestions: [
      "Can you tell me more about that 18% improvement?",
      "Why did you choose UX design as a career?",
      "What kind of design culture do you work best in?",
      "How do you usually collaborate with engineers?",
      "What do you do outside of work?",
    ],
    practiceTasks: [
      { id: "t-self-intro-30", label: "30-sec Answer" },
      { id: "t-self-intro-60", label: "60-sec Answer" },
      { id: "t-self-intro-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-career-motivation",
    topicName: "Career Motivation",
    scenario: "Interview",
    role: "General",
    difficulty: "Beginner",
    framework: "Why → What → Now",
    frameworkSteps: ["Why this direction", "What you did about it", "Why now"],
    source: "Built-in",
    status: "Not Started",
    skillTested: "Self-awareness, career narrative, motivation authenticity",
    chineseThinking:
      "面试官在判断你的职业选择是“想清楚了”还是“随便投的”。动机要连成一条线：过去的积累 → 现在的方向 → 这个岗位为什么是合理的下一步。",
    answerPoints: [
      "起点：什么经历让你进入这个方向",
      "行动：你为这个方向做过哪些具体投入",
      "验证：哪个结果说明你适合",
      "现在：为什么此刻要换/要加入",
    ],
    relatedQuestions: [
      "Why did you choose this career path?",
      "What motivates you in your work?",
      "Where do you see yourself in five years?",
      "Why are you leaving your current job?",
    ],
    vocabulary: [
      { intent: "职业方向", basic: "I like this job", professional: "This direction aligns with my long-term growth" },
      { intent: "投入", basic: "I spent time learning", professional: "I invested seriously in building this skill set" },
      { intent: "验证", basic: "It worked well", professional: "The results confirmed I'm on the right track" },
      { intent: "转型", basic: "I want to change", professional: "I'm ready to move into a larger scope" },
      { intent: "长期", basic: "in the future", professional: "over the next few years" },
    ],
    sentencePatterns: [
      { stage: "Origin", pattern: "My interest in ... started when ..." },
      { stage: "Action", pattern: "Since then, I've deliberately built experience in ..." },
      { stage: "Proof", pattern: "That experience showed me that ..." },
      { stage: "Now", pattern: "So at this point, the natural next step for me is ..." },
    ],
    sampleAnswers: {
      basic: "I choose this job because I like it. I learned many things. I want to do better in the future.",
      standard:
        "I moved into UX because I kept noticing how products fail people at the workflow level, not the visual level. So I taught myself research and prototyping, moved onto product projects, and found I'm good at structuring complex information. Now I want a bigger stage with more ambiguous problems.",
      advanced:
        "My path into UX wasn't accidental — I kept running into the same wall as a project coordinator: beautiful products that nobody could operate. That frustration pushed me into research and interaction design, and over three years I've validated that structuring complexity is where I create the most value. At this point, staying comfortable would mean repeating myself; your team's problem space is exactly the ambiguity I want to grow into.",
    },
    followUpQuestions: [
      "What was the hardest part of that transition?",
      "If money weren't a factor, what would you do?",
      "How does this role fit your five-year plan?",
      "What would make you leave a job?",
      "Who influenced your career choice the most?",
    ],
    practiceTasks: [
      { id: "t-career-motivation-30", label: "30-sec Answer" },
      { id: "t-career-motivation-60", label: "60-sec Answer" },
      { id: "t-career-motivation-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-why-company",
    topicName: "Why This Company",
    scenario: "Interview",
    role: "General",
    difficulty: "Beginner",
    framework: "Company-fit bridge",
    frameworkSteps: ["What they do", "Why it fits you", "What you add"],
    source: "Built-in",
    status: "Not Started",
    skillTested: "Research depth, sincerity, positioning",
    chineseThinking:
      "这题考的是你有没有做功课。回答结构：你了解他们什么 → 和你的能力/动机哪里匹配 → 你能补充什么。不要只说“贵公司是大平台”。",
    answerPoints: [
      "具体事实：产品、市场、近期动作（证明你研究过）",
      "匹配点：和你的能力或经历连接",
      "贡献点：你能帮他们解决什么",
      "避免：只夸公司，不谈自己",
    ],
    relatedQuestions: [
      "Why do you want to work here?",
      "What do you know about our company?",
      "Why our product and not a competitor's?",
      "How would you improve our product?",
    ],
    vocabulary: [
      { intent: "了解公司", basic: "I know your company is big", professional: "I've been following your expansion into ..." },
      { intent: "匹配", basic: "it fits me", professional: "it maps directly onto my experience in ..." },
      { intent: "认可方向", basic: "I think it is good", professional: "I buy into the strategy of ..." },
      { intent: "贡献", basic: "I can do something", professional: "I could add value on ..." },
      { intent: "对比", basic: "better than others", professional: "what sets you apart is ..." },
    ],
    sentencePatterns: [
      { stage: "Research", pattern: "I noticed you recently launched / shifted focus to ..." },
      { stage: "Fit", pattern: "That's close to the work I've been doing around ..." },
      { stage: "Contribution", pattern: "From my side, I could help with ..." },
      { stage: "Close", pattern: "So it feels like a two-way fit rather than just a brand name." },
    ],
    sampleAnswers: {
      basic: "Your company is very famous. I like your product. I think I can learn a lot here.",
      standard:
        "I've been using your scheduling product for two years, and I noticed you moved into team workflows last quarter — that's the exact space I worked in at my current company. I've handled the messiest part of that migration, so I can shortcut some of the lessons learned.",
      advanced:
        "Three things pulled me here: your pricing pivot to usage-based plans, your investment in the mobile experience, and the fact that you're still founder-led. I lived through a similar pricing migration and know how it reshapes feature requests — that experience would be immediately useful to your team, and frankly, the problem space is one I want to own long-term.",
    },
    followUpQuestions: [
      "Which of our features do you use most?",
      "What concerns do you have about joining us?",
      "What did you hear about our culture?",
      "If we rejected you, where would you apply?",
      "How do we compare with your current employer?",
    ],
    practiceTasks: [
      { id: "t-why-company-30", label: "30-sec Answer" },
      { id: "t-why-company-60", label: "60-sec Answer" },
      { id: "t-why-company-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-project-experience",
    topicName: "Project Experience",
    scenario: "Interview",
    role: "UX / Product",
    difficulty: "Intermediate",
    framework: "CPADI",
    frameworkSteps: ["Context", "Problem", "Action", "Decision", "Impact"],
    source: "PDF",
    status: "In Progress",
    skillTested: "Storytelling, ownership, measurable thinking",
    chineseThinking:
      "讲项目不是汇报工作，是证明“你的判断带来了结果”。背景一句带过，重点放在你做了什么决定、为什么这么决定、最后数字说话。",
    answerPoints: [
      "背景：什么项目、什么团队（一句话）",
      "问题：真正的挑战是什么",
      "行动：你具体做了什么（不是“我们”）",
      "决策：关键取舍及理由",
      "影响：可量化的结果",
    ],
    relatedQuestions: [
      "Tell me about a project you are proud of.",
      "Walk me through your most recent project.",
      "What was your specific contribution?",
      "What would you do differently?",
    ],
    vocabulary: [
      { intent: "主导", basic: "I did the project", professional: "I led the redesign of ..." },
      { intent: "挑战", basic: "it was difficult", professional: "The main challenge was ..." },
      { intent: "职责", basic: "my job was", professional: "My responsibility covered ..." },
      { intent: "取舍", basic: "we chose A not B", professional: "We made a deliberate trade-off between ..." },
      { intent: "结果", basic: "it went well", professional: "As a result, we saw a measurable lift in ..." },
    ],
    sentencePatterns: [
      { stage: "Context", pattern: "The project was a ... for ..., where I owned ..." },
      { stage: "Problem", pattern: "The core problem was that ..." },
      { stage: "Action", pattern: "I led the redesign of ..., working closely with ..." },
      { stage: "Impact", pattern: "As a result, ... improved by X% within ..." },
    ],
    sampleAnswers: {
      basic: "I joined a project last year. We made a website. I helped with the pages. The result was good.",
      standard:
        "Last year I led the redesign of our client portal. The problem was that 40% of users dropped off during document submission. I ran five user interviews, rebuilt the flow into a step-by-step wizard, and worked with engineers on error messaging. Submission completion went from 60% to 81% in two months.",
      advanced:
        "The project I'd highlight is the client portal redesign. Context: our agency clients managed campaigns through email and spreadsheets, and 40% abandoned the onboarding flow. My mandate was the end-to-end experience. I reframed the problem from 'make the UI cleaner' to 'remove the moments where users need support' — that reframe drove every decision, from a stepwise wizard to inline validation with human-readable errors. Two months after launch, submission completion moved from 60% to 81%, and support tickets about onboarding dropped by a third.",
    },
    followUpQuestions: [
      "How did you measure that 81%?",
      "What did the engineers push back on?",
      "What would version two look like?",
      "How did the client react to the change?",
      "What was your biggest mistake on this project?",
    ],
    practiceTasks: [
      { id: "t-project-experience-30", label: "30-sec Answer" },
      { id: "t-project-experience-60", label: "60-sec Answer" },
      { id: "t-project-experience-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-challenging-project",
    topicName: "Challenging Project",
    scenario: "Interview",
    role: "UX / Product",
    difficulty: "Intermediate",
    framework: "STAR",
    frameworkSteps: ["Situation", "Task", "Action", "Result"],
    source: "Built-in",
    status: "In Progress",
    skillTested: "Resilience, problem decomposition, ownership",
    chineseThinking:
      "“有挑战的项目”重点是挑战本身：难在哪、你怎么拆解、怎么推进。不要选一个其实很简单的项目，也不要把挑战说成抱怨同事。",
    answerPoints: [
      "情境：项目背景和约束",
      "任务：你要解决的具体问题",
      "行动：关键两三步，突出判断",
      "结果：结果 + 你学到的东西",
    ],
    relatedQuestions: [
      "Describe a challenging project you worked on.",
      "What is the most complex problem you've solved?",
      "Tell me about a project with a tight deadline.",
      "When did a project almost fail?",
    ],
    vocabulary: [
      { intent: "约束", basic: "we had no time", professional: "We were working under a hard constraint of ..." },
      { intent: "拆解", basic: "we broke it into parts", professional: "We decomposed the problem into ..." },
      { intent: "优先级", basic: "do the important first", professional: "We prioritized by impact versus effort" },
      { intent: "风险", basic: "it might fail", professional: "We flagged the risk early and de-scoped ..." },
      { intent: "交付", basic: "we finished on time", professional: "We shipped on schedule without compromising ..." },
    ],
    sentencePatterns: [
      { stage: "Situation", pattern: "The project had a hard constraint: ..." },
      { stage: "Task", pattern: "My task was to deliver ... within ..." },
      { stage: "Action", pattern: "The turning point was when I decided to ..." },
      { stage: "Result", pattern: "We shipped ..., and the takeaway for me was ..." },
    ],
    sampleAnswers: {
      basic: "The project was very hard. We had little time. I worked overtime. Finally we finished it.",
      standard:
        "Our biggest constraint was a six-week window to localize the product for three markets. I broke the work into a content audit, a component-level text-expansion fix, and market-specific QA. We cut two low-traffic pages to protect the deadline. We shipped on time, and the German market converted 9% above projection.",
      advanced:
        "The hardest project I've run was a six-week localization for three markets with no room to extend. The real challenge wasn't translation — it was that our components broke with 30% longer German text. I made the call to audit every component first rather than fixing pages ad hoc, which cost us week one but saved weeks of rework. We also de-scoped two low-traffic pages and told stakeholders why, in writing. We shipped on schedule, and that audit checklist became a team standard for every new component.",
    },
    followUpQuestions: [
      "Why audit components first instead of fixing pages?",
      "How did stakeholders react to the de-scoping?",
      "What broke anyway despite the plan?",
      "How did the team feel at the midpoint?",
      "Would you take that trade-off again?",
    ],
    practiceTasks: [
      { id: "t-challenging-project-30", label: "30-sec Answer" },
      { id: "t-challenging-project-60", label: "60-sec Answer" },
      { id: "t-challenging-project-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-teamwork",
    topicName: "Teamwork",
    scenario: "Behavioral",
    role: "General",
    difficulty: "Intermediate",
    framework: "STAR-Lite",
    frameworkSteps: ["Situation", "Action", "Result"],
    source: "Built-in",
    status: "Not Started",
    skillTested: "Collaboration, empathy, role clarity",
    chineseThinking:
      "团队题不是夸“我们氛围好”，而是讲清：目标是什么、你在团队里的角色、你怎么补位。最后落到团队拿到了什么结果。",
    answerPoints: [
      "团队构成和共同目标",
      "你承担的具体角色",
      "一次协作中的困难与处理",
      "团队成果 + 你个人的成长",
    ],
    relatedQuestions: [
      "Tell me about a time you worked in a team.",
      "What role do you usually take in a team?",
      "Describe a time you helped a teammate.",
      "How do you handle an underperforming teammate?",
    ],
    vocabulary: [
      { intent: "协作", basic: "we worked together", professional: "We collaborated closely across design and engineering" },
      { intent: "角色", basic: "I was the designer", professional: "I owned the design side of the project" },
      { intent: "补位", basic: "I helped others", professional: "I stepped up to cover the research gap" },
      { intent: "对齐", basic: "we talked about it", professional: "We aligned on scope and ownership early" },
      { intent: "成果", basic: "we did a good job", professional: "The team delivered ahead of the milestone" },
    ],
    sentencePatterns: [
      { stage: "Situation", pattern: "Our team of five was responsible for ..." },
      { stage: "Role", pattern: "I owned ..., while making sure ..." },
      { stage: "Action", pattern: "When ... fell behind, I stepped in to ..." },
      { stage: "Result", pattern: "Together we delivered ..., and I learned that ..." },
    ],
    sampleAnswers: {
      basic: "We were five people. I did the design. We helped each other. The project was successful.",
      standard:
        "On the portal project, our team of five had a researcher leave mid-sprint. I covered the remaining interviews myself, on top of design. To keep everyone aligned I set up a 15-minute daily sync with a shared decision log. We delivered on the original date, and the log became the team's default practice.",
      advanced:
        "Midway through the portal project, our researcher resigned, and interview findings were the dependency for three downstream workstreams. Rather than waiting for a backfill, I picked up the interviews myself and protected the timeline by introducing two things: a fifteen-minute daily sync and a single decision log so nothing lived in private chats. We shipped on the original date. The deeper lesson for me was that a team's velocity is set by how visible its decisions are — the log outlived the project.",
    },
    followUpQuestions: [
      "What would have happened without the decision log?",
      "Did covering two roles affect your quality?",
      "How did the team divide credit afterward?",
      "Have you ever disagreed with the whole team?",
      "What kind of teammates frustrate you?",
    ],
    practiceTasks: [
      { id: "t-teamwork-30", label: "30-sec Answer" },
      { id: "t-teamwork-60", label: "60-sec Answer" },
      { id: "t-teamwork-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-conflict",
    topicName: "Conflict Resolution",
    scenario: "Behavioral",
    role: "General",
    difficulty: "Intermediate",
    framework: "STAR",
    frameworkSteps: ["Situation", "Task", "Action", "Result"],
    source: "Generated",
    status: "Saved",
    skillTested: "Communication, emotional control, problem solving",
    chineseThinking:
      "这个问题不是问你有没有吵架，而是看你能不能在分歧中保持专业、澄清问题、推动解决。",
    answerPoints: [
      "冲突发生在什么背景下？",
      "分歧核心是什么？",
      "你如何沟通和协调？",
      "最后结果是什么？",
      "你学到了什么？",
    ],
    relatedQuestions: [
      "Tell me about a conflict you had at work.",
      "How do you handle disagreements with colleagues?",
      "Describe a time you disagreed with your manager.",
      "Have you ever had a conflict with a client?",
    ],
    vocabulary: [
      { intent: "冲突", basic: "conflict", professional: "disagreement / misalignment" },
      { intent: "澄清", basic: "ask clearly", professional: "clarify expectations" },
      { intent: "协调", basic: "work together", professional: "align priorities" },
      { intent: "解决", basic: "solve", professional: "resolve the issue" },
      { intent: "推进", basic: "continue", professional: "move the project forward" },
    ],
    sentencePatterns: [
      { stage: "Opening", pattern: "One example that comes to mind is a project where..." },
      { stage: "Action", pattern: "Instead of pushing my own opinion directly, I first tried to understand..." },
      { stage: "Result", pattern: "In the end, we reached a solution that worked for both sides." },
      { stage: "Reflection", pattern: "This experience taught me that conflict is not always negative if handled with clarity and respect." },
    ],
    sampleAnswers: {
      basic: "I had a conflict with a colleague about the design. We talked and solved it. It was fine in the end.",
      standard:
        "On a dashboard project, the lead engineer and I disagreed about simplifying a settings page — he worried about breaking existing users, I argued the current layout confused new ones. Instead of debating in the meeting, I pulled the usage data: only 4% of users touched the advanced settings. We kept them behind a progressive disclosure and shipped the simplified default. Activation improved, and nothing broke.",
      advanced:
        "A disagreement I'd highlight: our lead engineer and I were at a stalemate over simplifying a settings page. His concern was regression risk for power users; mine was that new users abandoned setup halfway. Rather than escalating to opinion-versus-opinion, I reframed it as a data question — usage showed under 4% of accounts touched advanced settings within 30 days. That single fact let us design a progressive disclosure that protected both positions. We shipped, activation rose, and support tickets stayed flat. The meta-lesson: most design conflicts are actually disagreements about which risk matters more — name the risk, and the argument collapses into a solvable problem.",
    },
    followUpQuestions: [
      "What exactly was the conflict about?",
      "How did the other person react?",
      "What would you do differently next time?",
      "How do you usually deal with difficult colleagues?",
      "Can you give another example?",
    ],
    practiceTasks: [
      { id: "t-conflict-30", label: "30-sec Answer" },
      { id: "t-conflict-60", label: "60-sec Answer" },
      { id: "t-conflict-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-pressure",
    topicName: "Handling Pressure",
    scenario: "Behavioral",
    role: "General",
    difficulty: "Intermediate",
    framework: "Pause → Prioritize → Communicate",
    frameworkSteps: ["Pause", "Prioritize", "Communicate", "Deliver"],
    source: "Built-in",
    status: "Not Started",
    skillTested: "Composure, prioritization, stakeholder management",
    chineseThinking:
      "压力题考的是你的“操作系统”：慌不慌、怎么排优先级、怎么管理预期。答案要展示方法，而不是渲染痛苦。",
    answerPoints: [
      "压力来源：什么同时压过来",
      "第一步：怎么冷静并快速分类",
      "沟通：如何向相关方管理预期",
      "结果：交付了什么、扛住了什么",
    ],
    relatedQuestions: [
      "Tell me about a time you worked under pressure.",
      "How do you handle tight deadlines?",
      "Describe a time you had too many priorities.",
      "When was the last time you felt stressed at work?",
    ],
    vocabulary: [
      { intent: "高压", basic: "very busy", professional: "operating under a compressed timeline" },
      { intent: "排序", basic: "do important things first", professional: "triage by business impact" },
      { intent: "预期管理", basic: "tell them early", professional: "set expectations with stakeholders upfront" },
      { intent: "应对", basic: "stay calm", professional: "keep a clear head and sequence the work" },
      { intent: "交付", basic: "finish the work", professional: "deliver the critical path on time" },
    ],
    sentencePatterns: [
      { stage: "Situation", pattern: "Two high-stakes deadlines landed in the same week ..." },
      { stage: "Approach", pattern: "The first thing I did was step back and separate urgent from important ..." },
      { stage: "Communication", pattern: "I flagged the risk to stakeholders early and proposed ..." },
      { stage: "Result", pattern: "We delivered the critical path on time, and I kept a buffer for ..." },
    ],
    sampleAnswers: {
      basic: "Once we had two deadlines together. It was very busy. I worked hard and finished both. My manager was happy.",
      standard:
        "Last quarter a client demo and a compliance audit landed in the same week. I listed everything by consequence — the audit had a legal deadline, the demo had flexibility. I negotiated moving the demo by three days, blocked two full days for audit prep, and briefed both stakeholders the same morning. Both landed without drama.",
      advanced:
        "The week that tested my composure: a client demo and a compliance audit collided. My first move was to refuse to treat them as equally urgent — I mapped consequences and found only one hard external deadline. I went to stakeholders the same morning, not with a complaint but with a proposal: shift the demo 72 hours, and I'd use the freed time to make the audit airtight. That early trade bought calm execution space. Both commitments landed, and I took away a rule I still use: under pressure, the fastest relief is an honest re-negotiation, not silent heroics.",
    },
    followUpQuestions: [
      "What if the demo couldn't be moved?",
      "How do you recharge after an intense week?",
      "Have you ever missed a deadline anyway?",
      "How do you help teammates under pressure?",
      "What pressure situations drain you most?",
    ],
    practiceTasks: [
      { id: "t-pressure-30", label: "30-sec Answer" },
      { id: "t-pressure-60", label: "60-sec Answer" },
      { id: "t-pressure-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-failure",
    topicName: "Failure Experience",
    scenario: "Behavioral",
    role: "General",
    difficulty: "Advanced",
    framework: "Failure → Learn → Adapt",
    frameworkSteps: ["Own it", "Analyze it", "Change something", "Prove the change"],
    source: "Built-in",
    status: "Not Started",
    skillTested: "Accountability, self-awareness, growth trajectory",
    chineseThinking:
      "失败题的雷区是“我其实没失败”或者甩锅。正确姿势：承认一个真实的失误、客观分析原因、说你改了什么、证明改进生效了。",
    answerPoints: [
      "真实失误：选一个有代价的，别选安全的小事",
      "归因：主因在自己哪里",
      "改变：之后你的做法有什么不同",
      "验证：后来同类场景结果如何",
    ],
    relatedQuestions: [
      "Tell me about a time you failed.",
      "Describe your biggest professional mistake.",
      "What would your former manager criticize about you?",
      "Tell me about a decision you regret.",
    ],
    vocabulary: [
      { intent: "失败", basic: "I failed", professional: "The initiative fell short of the goal" },
      { intent: "归因", basic: "it was my problem", professional: "The root cause was my assumption that ..." },
      { intent: "吸取教训", basic: "I learned a lesson", professional: "I took away a concrete change in how I ..." },
      { intent: "改进", basic: "now I do better", professional: "Since then I've built ... into my process" },
      { intent: "验证", basic: "it works now", professional: "The next comparable project delivered ..." },
    ],
    sentencePatterns: [
      { stage: "Own it", pattern: "A real miss for me was when ..." },
      { stage: "Analyze", pattern: "Looking back, the root cause was that I ..." },
      { stage: "Adapt", pattern: "What I changed afterward was ..." },
      { stage: "Prove", pattern: "The next time a similar situation came up, ..." },
    ],
    sampleAnswers: {
      basic: "I failed once in a project. I was sad. But I learned from it and now I do better.",
      standard:
        "I once shipped a feature I was sure users wanted — a bulk-edit tool — without testing it with actual administrators. Adoption was under 5%. The root cause was that I validated with friendly users, not real ones. Now I test with at least three users from the target segment before building. The next feature I shipped hit 34% adoption.",
      advanced:
        "My most instructive failure: I pushed a bulk-edit feature through on conviction and friendly-user praise, skipping structured validation with the administrators who'd actually use it. Adoption sat under 5% for a quarter — real cost, my call. The root cause wasn't laziness; it was confirmation bias dressed up as speed. I rebuilt my process around a non-negotiable: three target-segment users before any build. The next tool I shipped reached 34% adoption in six weeks. I'm honestly glad it happened early — it's cheaper to learn that lesson on a feature than on a product.",
    },
    followUpQuestions: [
      "Who was affected by that failure?",
      "How did your manager respond?",
      "Have you repeated a similar mistake since?",
      "How do you decide when to skip validation?",
      "What does 'failure' mean to you now?",
    ],
    practiceTasks: [
      { id: "t-failure-30", label: "30-sec Answer" },
      { id: "t-failure-60", label: "60-sec Answer" },
      { id: "t-failure-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-cross-functional",
    topicName: "Cross-functional Collaboration",
    scenario: "Behavioral",
    role: "UX / Product",
    difficulty: "Advanced",
    framework: "Map → Align → Deliver",
    frameworkSteps: ["Map stakeholders", "Align on goals", "Deliver together"],
    source: "Built-in",
    status: "Not Started",
    skillTested: "Influence without authority, systems thinking",
    chineseThinking:
      "跨部门协作的核心是：你能不能让不向你汇报的人愿意配合。讲清楚你怎么理解对方的 KPI、怎么找到共同目标、怎么推进落地。",
    answerPoints: [
      "涉及的部门和各自的关注点",
      "你如何找到共同目标",
      "推动机制：什么会议/文档/流程",
      "结果：跨部门一起交付了什么",
    ],
    relatedQuestions: [
      "Tell me about working across teams.",
      "How do you get buy-in from other departments?",
      "Describe a time you influenced without authority.",
      "How do you handle a stakeholder who blocks you?",
    ],
    vocabulary: [
      { intent: "跨部门", basic: "work with other teams", professional: "cross-functional collaboration" },
      { intent: "共同目标", basic: "same goal", professional: "a shared outcome both teams could commit to" },
      { intent: "推动", basic: "push people to do", professional: "build momentum by ..." },
      { intent: "说服", basic: "make them agree", professional: "earn buy-in by tying the proposal to their metrics" },
      { intent: "落地", basic: "make it happen", professional: "drive it to launch across three teams" },
    ],
    sentencePatterns: [
      { stage: "Map", pattern: "Each team had a different definition of success, so I started by ..." },
      { stage: "Align", pattern: "We found overlap in ..., which became our shared metric" },
      { stage: "Influence", pattern: "Instead of selling my proposal, I framed it in terms of their quarterly goal" },
      { stage: "Deliver", pattern: "Together we shipped ..., and the shared metric moved from X to Y" },
    ],
    sampleAnswers: {
      basic: "I worked with sales and engineering. We had meetings. Sometimes it was hard. Finally we finished the project.",
      standard:
        "For the pricing-page redo, sales wanted more customization options, engineering wanted less branching, and I wanted clearer tiers. I mapped each team's real constraint, then proposed a modular layout that let sales add proof points without engineering work. We reviewed it together weekly. Conversion rose 12%, and the weekly review became permanent.",
      advanced:
        "The pricing-page project was a three-way standoff: sales needed per-segment customization, engineering refused deeper branching logic, and design wanted fewer decisions on the page. Rather than arbitrating, I made the constraints visible — one diagram showing what each team was actually protecting. That turned a debate into a design brief: a modular system where sales controls content blocks, engineering keeps a fixed component set, and users see a shorter decision path. Shipped in six weeks, +12% conversion, and the constraints diagram became how that group scopes work now.",
    },
    followUpQuestions: [
      "Whose constraint was hardest to work around?",
      "What if engineering had refused the component set?",
      "How did you keep momentum between weekly reviews?",
      "What did you learn about sales as a function?",
      "When is cross-functional alignment NOT worth the time?",
    ],
    practiceTasks: [
      { id: "t-cross-functional-30", label: "30-sec Answer" },
      { id: "t-cross-functional-60", label: "60-sec Answer" },
      { id: "t-cross-functional-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-meeting-disagreement",
    topicName: "Meeting Disagreement",
    scenario: "Workplace",
    role: "General",
    difficulty: "Advanced",
    framework: "PREP",
    frameworkSteps: ["Point", "Reason", "Example", "Point"],
    source: "Built-in",
    status: "Not Started",
    skillTested: "Real-time argument building, diplomatic pushback",
    chineseThinking:
      "会上反对别人，重点不是赢，而是让讨论回到事实。PREP 结构：先给结论、再给理由、举一个例子、重申结论。语气坚定但对事不对人。",
    answerPoints: [
      "先明确表态：我同意/不同意哪部分",
      "给理由：基于什么信息",
      "举例子：数据或先例",
      "重申 + 留余地：邀请讨论",
    ],
    relatedQuestions: [
      "How do you disagree in a meeting?",
      "Your manager proposes something you think is wrong. What do you say?",
      "How do you push back on a client request?",
      "Tell me about a time you changed someone's mind.",
    ],
    vocabulary: [
      { intent: "不同意", basic: "I don't agree", professional: "I see it differently, and here's why" },
      { intent: "部分同意", basic: "you are right but", professional: "I agree with the goal; I'd question the approach" },
      { intent: "依据", basic: "I think so", professional: "Based on the data we pulled last week ..." },
      { intent: "举例", basic: "for example", professional: "To put that in context ..." },
      { intent: "留余地", basic: "maybe I am wrong", professional: "Happy to be wrong — what would change my mind is ..." },
    ],
    sentencePatterns: [
      { stage: "Point", pattern: "I'd like to offer a different perspective on this." },
      { stage: "Reason", pattern: "My concern is that ... which would affect ..." },
      { stage: "Example", pattern: "To put that in context, when we tried X last quarter ..." },
      { stage: "Point restated", pattern: "So that's why I'd suggest we ... — but I'm open to what I'm missing." },
    ],
    sampleAnswers: {
      basic: "I will say I don't agree. I think another way is better. Let's discuss.",
      standard:
        "I see the appeal of shipping on Friday, but I'd push back on one thing: we haven't load-tested the new checkout. Last quarter we shipped a similar change untested and spent the weekend on hotfixes. I'd suggest we either test Thursday morning or ship behind a flag. Happy to be convinced otherwise if there's a reason Friday matters.",
      advanced:
        "I agree with the goal of hitting Friday — I'd question the path. My concern: the new checkout path has zero load-testing, and our last 'small' release without it cost us a weekend of hotfixes and about 40 support tickets. So my suggestion is binary: either we protect Friday by shipping behind a feature flag, or we protect quality by moving to Monday. What I'd need to change my mind is evidence the risk is lower than last time — if we have that, I'm fully on board with Friday.",
    },
    followUpQuestions: [
      "What if your manager overrules you?",
      "How do you disagree with a client politely?",
      "What if someone interrupts your pushback?",
      "How do you handle a teammate who never concedes?",
      "When should you stay quiet in a meeting?",
    ],
    practiceTasks: [
      { id: "t-meeting-disagreement-30", label: "30-sec Answer" },
      { id: "t-meeting-disagreement-60", label: "60-sec Answer" },
      { id: "t-meeting-disagreement-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-progress-update",
    topicName: "Progress Update",
    scenario: "Workplace",
    role: "General",
    difficulty: "Beginner",
    framework: "Done → Next → Blocked",
    frameworkSteps: ["What's done", "What's next", "What's blocked"],
    source: "Built-in",
    status: "Not Started",
    skillTested: "Concise reporting, expectation management",
    chineseThinking:
      "进度汇报的价值在于让对方 30 秒内判断“要不要操心”。结构永远是最简单的三段：完成了什么、接下来什么、卡在哪里需要谁。",
    answerPoints: [
      "完成：对目标有影响的进展，不是活动清单",
      "下一步：接下来 1-2 个动作和时间",
      "阻塞：需要什么决策或资源",
      "一句收尾：整体是否 on track",
    ],
    relatedQuestions: [
      "Can you give us a quick status update?",
      "Where are we on the portal project?",
      "What's blocking you right now?",
      "How do you report progress to leadership?",
    ],
    vocabulary: [
      { intent: "完成", basic: "I finished", professional: "The first milestone is complete" },
      { intent: "进行中", basic: "I am doing it now", professional: "In progress, on track for Friday" },
      { intent: "风险", basic: "maybe a problem", professional: "There's a risk we need to get ahead of" },
      { intent: "需要", basic: "I need help", professional: "I need a decision on X by Thursday" },
      { intent: "按计划", basic: "on time", professional: "We're on track against the original timeline" },
    ],
    sentencePatterns: [
      { stage: "Done", pattern: "Quick update: the wizard flow is done and in QA." },
      { stage: "Next", pattern: "Next, I'm moving to error states, landing Wednesday." },
      { stage: "Blocked", pattern: "One blocker: I need legal's sign-off on the copy." },
      { stage: "Close", pattern: "Overall we're on track, with one dependency to watch." },
    ],
    sampleAnswers: {
      basic: "I finished the design. Now I am waiting for feedback. I think we are on time.",
      standard:
        "Quick update on the portal: the submission wizard is built and in QA as of yesterday. Today I'm starting error states, which should land Wednesday. One blocker — I need legal's sign-off on the disclaimer copy before we can finalize. Overall we're on track for the 20th if that lands this week.",
      advanced:
        "Three-part update. Done: the submission wizard shipped to QA yesterday, two days ahead of plan, and early bug counts look clean. Next: error-state coverage this week, Wednesday target, which de-risks the 20th launch. Blocked: one item — legal sign-off on the disclaimer copy; if it slips past Friday, we lose our buffer, so I'd like to flag it for a nudge today. Bottom line: on track, one dependency worth watching.",
    },
    followUpQuestions: [
      "What happens if legal slips to next week?",
      "How often do you send updates like this?",
      "What would make you report 'off track'?",
      "Who else needs to hear this update?",
      "How do you handle a manager who wants more detail?",
    ],
    practiceTasks: [
      { id: "t-progress-update-30", label: "30-sec Answer" },
      { id: "t-progress-update-60", label: "60-sec Answer" },
      { id: "t-progress-update-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-client-followup",
    topicName: "Client Follow-up",
    scenario: "Business",
    role: "Foreign Trade",
    difficulty: "Intermediate",
    framework: "Need → Proposal → Next Step",
    frameworkSteps: ["Confirm need", "Give proposal", "Lock next step"],
    source: "PDF",
    status: "Not Started",
    skillTested: "Business tone, initiative, closing skills",
    chineseThinking:
      "跟进客户不是“催一下”，而是推进决策。每次跟进都要有：确认需求、给出方案、明确下一步（具体时间）。没有下一步的跟进等于没跟进。",
    answerPoints: [
      "回顾上次沟通的要点",
      "针对需求给出具体方案或信息",
      "明确下一步：谁在什么时间做什么",
      "语气专业、简短、易回复",
    ],
    relatedQuestions: [
      "How do you follow up with a client who went quiet?",
      "Write a follow-up email after sending a quotation.",
      "A client says 'let me think about it.' What now?",
      "How do you ask for the order without pressure?",
    ],
    vocabulary: [
      { intent: "跟进", basic: "I'm writing to ask", professional: "I'm following up on the proposal from last week" },
      { intent: "方案", basic: "here is our plan", professional: "Based on your volume, I'd recommend ..." },
      { intent: "下一步", basic: "please tell me", professional: "The next step would be a short call to ..." },
      { intent: "制造紧迫", basic: "hurry up", professional: "The current pricing holds until the end of the month" },
      { intent: "收尾", basic: "wait for your reply", professional: "Does Thursday 3pm work for a 15-minute review?" },
    ],
    sentencePatterns: [
      { stage: "Reference", pattern: "Following up on the quotation I sent on the 3rd ..." },
      { stage: "Proposal", pattern: "Based on your seasonal volume, I'd suggest the tiered plan because ..." },
      { stage: "Next step", pattern: "Could we lock 15 minutes Thursday to walk through the numbers?" },
      { stage: "Close", pattern: "If it's easier, just reply with a time and I'll set it up." },
    ],
    sampleAnswers: {
      basic: "Hello, did you see my email? Please reply soon. We have good price.",
      standard:
        "Hi Mark, following up on the quotation from the 3rd. Based on your Q4 volume, I'd still recommend the tiered plan — it saves about 8% versus the flat rate at your quantities. One thing I can add: we can hold current pricing through the end of the month. Would a 15-minute call Thursday work to close the details?",
      advanced:
        "Hi Mark — circling back on the Oct 3 quotation. Where we left it, you wanted to compare the tiered structure against your incumbent's flat rate. At your Q4 volume the tiered plan prices out about 8% lower, and I've attached a side-by-side so your finance team doesn't have to rebuild it. Two things worth deciding soon: current pricing holds to month-end, and the December slot at our plant is nearly booked. If it helps, I'll hold Thursday 3pm for a 15-minute decision call — reply 'works' and I'll send the invite.",
    },
    followUpQuestions: [
      "Mark still doesn't reply after this. What next?",
      "How do you follow up without sounding desperate?",
      "The client says your price is too high. Respond.",
      "How often is too often to follow up?",
      "How would you restart a client silent for six months?",
    ],
    practiceTasks: [
      { id: "t-client-followup-30", label: "30-sec Answer" },
      { id: "t-client-followup-60", label: "60-sec Answer" },
      { id: "t-client-followup-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-price-negotiation",
    topicName: "Price Negotiation",
    scenario: "Business",
    role: "Foreign Trade",
    difficulty: "Advanced",
    framework: "Value → Anchor → Trade",
    frameworkSteps: ["Re-anchor value", "Anchor the number", "Trade, don't concede"],
    source: "Built-in",
    status: "Not Started",
    skillTested: "Composure, value framing, structured concessions",
    chineseThinking:
      "谈价格不是互相磨数字，而是先守住价值，再谈条件。任何让步都要换回东西：量、账期、周期、 referral。白让步会让对方继续压。",
    answerPoints: [
      "先重申价值，别急着回应数字",
      "给出锚点：报价逻辑而不是一口价",
      "让步必须交换：数量/周期/付款方式",
      "底线清楚，礼貌但不动摇",
    ],
    relatedQuestions: [
      "A client asks for a 20% discount. How do you respond?",
      "How do you defend your price without losing the client?",
      "The client compares you to a cheaper competitor. What do you say?",
      "When should you walk away from a deal?",
    ],
    vocabulary: [
      { intent: "坚持价格", basic: "our price is fixed", professional: "The price reflects the spec and lead time you need" },
      { intent: "让步", basic: "I can lower a bit", professional: "There's room if we adjust the scope" },
      { intent: "交换条件", basic: "if you buy more, cheaper", professional: "I can revisit pricing at a committed volume" },
      { intent: "锚定", basic: "our price is X", professional: "For this spec, market range sits between X and Y" },
      { intent: "底线", basic: "that's my last price", professional: "This is as far as we can go and keep the quality bar" },
    ],
    sentencePatterns: [
      { stage: "Value", pattern: "Before we talk numbers — the quote covers ..., which the cheaper option doesn't." },
      { stage: "Anchor", pattern: "For this spec and lead time, the market range is ... to ..." },
      { stage: "Trade", pattern: "I can move to X if we can commit to Y." },
      { stage: "Hold", pattern: "Below that, we'd have to cut corners I don't think you want." },
    ],
    sampleAnswers: {
      basic: "20% is too much. I can give 5%. That is our best price. Please confirm.",
      standard:
        "I appreciate the directness. Twenty percent would take us below cost for this spec. What I can do: if you commit to the annual volume, I can rework to 8% and hold pricing for next year. That keeps the quality bar where it is. If budget is the constraint, we could also look at adjusting the spec — shall I prepare both versions?",
      advanced:
        "Happy to engage on price — I'd just frame it first. The 20% gap isn't a rounding issue on our side: this quote includes the accelerated lead time and the extended warranty, which the comparison price likely doesn't. For this spec, market sits between $2.10 and $2.40; we're at $2.18. Here's where I can move: commit to the 12-month volume and I'll rework to $2.02 with a price hold through next year — that's an 8% swing earned by certainty, not a concession. Alternatively, trim the spec and I'll re-quote by tomorrow. What I can't do is meet 20% on this scope — that's a different product.",
    },
    followUpQuestions: [
      "The client insists: 'final offer is 20% off.' Now what?",
      "How do you say no without losing the relationship?",
      "What non-price concessions work in your industry?",
      "How do you handle a client who anchors absurdly low?",
      "When is discounting actually the right call?",
    ],
    practiceTasks: [
      { id: "t-price-negotiation-30", label: "30-sec Answer" },
      { id: "t-price-negotiation-60", label: "60-sec Answer" },
      { id: "t-price-negotiation-fu", label: "Follow-up Challenge" },
    ],
  },
  {
    id: "t-travel-emergency",
    topicName: "Business Travel Emergency",
    scenario: "Travel",
    role: "Foreign Trade",
    difficulty: "Intermediate",
    framework: "Calm → Clause → Solution",
    frameworkSteps: ["Stay calm", "State the facts", "Offer a solution"],
    source: "Built-in",
    status: "Not Started",
    skillTested: "Composure in high-stakes, solution-first English",
    chineseThinking:
      "出差突发状况（航班取消、酒店订错、护照问题）考验的是：先稳定情绪、说清事实、马上给方案。英语不用华丽，要的是清楚和镇定。",
    answerPoints: [
      "情况：一句话说清发生了什么",
      "影响：对你行程/客户会议的具体影响",
      "方案：你已经想到的两条路",
      "请求：需要对方做什么",
    ],
    relatedQuestions: [
      "Your flight is cancelled before a client meeting. What do you do?",
      "You arrive and the hotel has no record of your booking. Handle it.",
      "Your passport is lost abroad. Walk me through your first hour.",
      "A client meeting overlaps with your rescheduled flight. What do you say?",
    ],
    vocabulary: [
      { intent: "突发", basic: "big problem", professional: "an unexpected disruption" },
      { intent: "说清事实", basic: "my flight is gone", professional: "My connecting flight was cancelled, so I'll land six hours late" },
      { intent: "备选方案", basic: "another idea", professional: "One option is ...; alternatively ..." },
      { intent: "请求帮助", basic: "please help me", professional: "Could you check if there's a seat on the 6am departure?" },
      { intent: "保持镇定", basic: "don't worry", professional: "I understand it's a busy evening — let's find the fastest fix" },
    ],
    sentencePatterns: [
      { stage: "Fact", pattern: "My 7pm connection was cancelled, so I'd miss the morning session." },
      { stage: "Impact", pattern: "This affects tomorrow's 10am demo with the client." },
      { stage: "Solution", pattern: "Two options: the 6am via Frankfurt gets me in by 9, or we move the demo to 2pm." },
      { stage: "Request", pattern: "Could you put me on standby for the Frankfurt flight while I notify the client?" },
    ],
    sampleAnswers: {
      basic: "My flight is cancelled. I cannot come tomorrow. Can you help me? I am very worried.",
      standard:
        "Good evening — my 7pm connection to Munich was cancelled, which puts me at risk for tomorrow's 10am demo. I see a 6am routing through Frankfurt that lands at 9:15. Could you put me on standby for that one? Meanwhile I'll message the client and offer a 2pm fallback, so either way the demo happens tomorrow.",
      advanced:
        "Evening — quick situation and a fix. My 7pm Munich connection was cancelled; as it stands I miss the 10am demo. The 6am Frankfurt routing lands 9:15, tight but workable if ground transport cooperates. Two asks: standby on that flight, and a note in the record in case rebooking fees come up. In parallel I'm messaging the client with a 2pm fallback framed as 'confirming 10am, with 2pm as a safety slot' — they see control, not panic. Either branch, the demo happens tomorrow.",
    },
    followUpQuestions: [
      "The airline says no standby seats. What then?",
      "How do you brief your manager about this?",
      "The client is upset about the near-miss. What do you say?",
      "What's in your travel-emergency playbook now?",
      "How do you keep calm when everything goes wrong at once?",
    ],
    practiceTasks: [
      { id: "t-travel-emergency-30", label: "30-sec Answer" },
      { id: "t-travel-emergency-60", label: "60-sec Answer" },
      { id: "t-travel-emergency-fu", label: "Follow-up Challenge" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Dashboard seed state                                                */
/* ------------------------------------------------------------------ */

export const initialTodayTasks: TodayTask[] = [
  {
    id: "task-1",
    title: "录一版 60 秒自我介绍",
    titleEn: "Record a 60-sec self-introduction",
    status: "done",
    topicId: "t-self-intro",
    taskType: "60-sec Answer",
    timeLimit: 60,
  },
  {
    id: "task-2",
    title: "拆解一个项目经历问题",
    titleEn: "Break down one project experience question",
    status: "in_progress",
    topicId: "t-project-experience",
    taskType: "60-sec Answer",
    timeLimit: 60,
  },
  {
    id: "task-3",
    title: "练习 3 个面试官追问",
    titleEn: "Practice 3 interviewer follow-up questions",
    status: "not_started",
    topicId: "t-project-experience",
    taskType: "Follow-up Challenge",
    timeLimit: 90,
  },
  {
    id: "task-4",
    title: "复盘今日卡顿表达",
    titleEn: "Review today's stuck expressions",
    status: "not_started",
    topicId: "t-conflict",
    taskType: "30-sec Answer",
    timeLimit: 30,
  },
];

export const initialProfile: Profile = {
  targetRole: "UX Designer",
  companyType: "US company",
  englishLevel: "B2 — Upper-intermediate",
  dailyMinutes: 30,
  weakness: "I cannot explain my projects",
  preferredScenario: "Foreign-company Interview",
};

export const initialRecords: PracticeRecord[] = [
  {
    id: "r-1",
    date: "Oct 09",
    topicName: "Self-introduction",
    task: "90-sec answer",
    score: 4.1,
    fluency: 4.0,
    logic: 4.2,
    tone: 3.9,
    durationSec: 88,
    mainIssue: "too long",
    nextStep: "shorten background",
  },
  {
    id: "r-2",
    date: "Oct 08",
    topicName: "Conflict Resolution",
    task: "follow-up",
    score: 3.4,
    fluency: 3.2,
    logic: 3.5,
    tone: 3.4,
    durationSec: 52,
    mainIssue: "weak result",
    nextStep: "add outcome",
  },
  {
    id: "r-3",
    date: "Oct 07",
    topicName: "Project Experience",
    task: "60-sec answer",
    score: 3.8,
    fluency: 3.9,
    logic: 3.8,
    tone: 3.6,
    durationSec: 61,
    mainIssue: "contribution unclear",
    nextStep: "add action verbs",
  },
  {
    id: "r-4",
    date: "Oct 06",
    topicName: "Teamwork",
    task: "60-sec answer",
    score: 3.6,
    fluency: 3.7,
    logic: 3.5,
    tone: 3.5,
    durationSec: 58,
    mainIssue: "rambling start",
    nextStep: "open with one-line summary",
  },
  {
    id: "r-5",
    date: "Oct 05",
    topicName: "Self-introduction",
    task: "60-sec answer",
    score: 3.9,
    fluency: 3.8,
    logic: 4.0,
    tone: 3.8,
    durationSec: 62,
    mainIssue: "memorized rhythm",
    nextStep: "practice with variations",
  },
  {
    id: "r-6",
    date: "Oct 04",
    topicName: "Why This Company",
    task: "30-sec answer",
    score: 3.3,
    fluency: 3.5,
    logic: 3.2,
    tone: 3.1,
    durationSec: 33,
    mainIssue: "generic reasons",
    nextStep: "research product facts",
  },
];

export const initialExpressions: ExpressionItem[] = [
  { text: "cross-functional collaboration", status: "Practiced" },
  { text: "clarify expectations", status: "Practiced" },
  { text: "align priorities", status: "Practiced" },
  { text: "move the project forward", status: "Practiced" },
  { text: "deliver measurable impact", status: "Practiced" },
  { text: "set expectations upfront", status: "Not used yet" },
  { text: "a deliberate trade-off", status: "Not used yet" },
  { text: "earn buy-in by tying it to their metrics", status: "Not used yet" },
];

/* Seeded aggregates so the review page looks like a real account */
export const seedStats = {
  totalPractices: 18,
  speakingMinutes: 126,
  topicsPracticed: 9,
  masteredExpressions: 42,
  baseConfidence: 3.6,
  weeklyProgress: 68,
  streakDay: 6,
  currentPhase: "Project Storytelling",
};

/* ------------------------------------------------------------------ */
/* 30-day training plan                                                */
/* ------------------------------------------------------------------ */

export interface PlanDay {
  day: number;
  week: number;
  title: string;
  topicId: string;
  taskType: "30-sec Answer" | "60-sec Answer" | "90-sec Answer" | "Follow-up Challenge" | "Weekly Review";
  state: "done" | "today" | "upcoming";
}

export interface PlanWeek {
  week: number;
  name: string;
  nameZh: string;
  goal: string; // 中文目标
  goalEn: string;
}

export const planWeeks: PlanWeek[] = [
  { week: 1, name: "Interview Basics", nameZh: "面试基本功", goal: "讲清自己", goalEn: "Speak clearly about yourself" },
  { week: 2, name: "Project Storytelling", nameZh: "项目叙事", goal: "讲清项目", goalEn: "Tell your project story" },
  { week: 3, name: "Behavioral Interview", nameZh: "行为面试", goal: "接住追问", goalEn: "Handle follow-up questions" },
  { week: 4, name: "Workplace Communication", nameZh: "职场沟通", goal: "进入真实职场", goalEn: "Operate in real workplaces" },
];

export const planDays: PlanDay[] = [
  { day: 1, week: 1, title: "Self-introduction", topicId: "t-self-intro", taskType: "30-sec Answer", state: "done" },
  { day: 2, week: 1, title: "Career motivation", topicId: "t-career-motivation", taskType: "60-sec Answer", state: "done" },
  { day: 3, week: 1, title: "Why this company", topicId: "t-why-company", taskType: "60-sec Answer", state: "done" },
  { day: 4, week: 1, title: "Strengths and weakness", topicId: "t-self-intro", taskType: "Follow-up Challenge", state: "done" },
  { day: 5, week: 1, title: "60-sec intro recording", topicId: "t-self-intro", taskType: "60-sec Answer", state: "done" },
  { day: 6, week: 1, title: "Follow-up questions", topicId: "t-self-intro", taskType: "Follow-up Challenge", state: "today" },
  { day: 7, week: 1, title: "Weekly review", topicId: "t-self-intro", taskType: "Weekly Review", state: "upcoming" },
  { day: 8, week: 2, title: "Project structure", topicId: "t-project-experience", taskType: "30-sec Answer", state: "upcoming" },
  { day: 9, week: 2, title: "Project background", topicId: "t-project-experience", taskType: "60-sec Answer", state: "upcoming" },
  { day: 10, week: 2, title: "Your contribution", topicId: "t-project-experience", taskType: "60-sec Answer", state: "upcoming" },
  { day: 11, week: 2, title: "Design / business decision", topicId: "t-challenging-project", taskType: "60-sec Answer", state: "upcoming" },
  { day: 12, week: 2, title: "Project impact", topicId: "t-project-experience", taskType: "90-sec Answer", state: "upcoming" },
  { day: 13, week: 2, title: "Follow-up challenge", topicId: "t-project-experience", taskType: "Follow-up Challenge", state: "upcoming" },
  { day: 14, week: 2, title: "Weekly review", topicId: "t-project-experience", taskType: "Weekly Review", state: "upcoming" },
  { day: 15, week: 3, title: "Teamwork", topicId: "t-teamwork", taskType: "60-sec Answer", state: "upcoming" },
  { day: 16, week: 3, title: "Conflict", topicId: "t-conflict", taskType: "60-sec Answer", state: "upcoming" },
  { day: 17, week: 3, title: "Pressure", topicId: "t-pressure", taskType: "60-sec Answer", state: "upcoming" },
  { day: 18, week: 3, title: "Failure", topicId: "t-failure", taskType: "60-sec Answer", state: "upcoming" },
  { day: 19, week: 3, title: "Leadership", topicId: "t-cross-functional", taskType: "60-sec Answer", state: "upcoming" },
  { day: 20, week: 3, title: "Cross-functional collaboration", topicId: "t-cross-functional", taskType: "Follow-up Challenge", state: "upcoming" },
  { day: 21, week: 3, title: "Weekly mock interview", topicId: "t-conflict", taskType: "Weekly Review", state: "upcoming" },
  { day: 22, week: 4, title: "Express opinions", topicId: "t-meeting-disagreement", taskType: "60-sec Answer", state: "upcoming" },
  { day: 23, week: 4, title: "Disagree politely", topicId: "t-meeting-disagreement", taskType: "60-sec Answer", state: "upcoming" },
  { day: 24, week: 4, title: "Clarify tasks", topicId: "t-progress-update", taskType: "30-sec Answer", state: "upcoming" },
  { day: 25, week: 4, title: "Report progress", topicId: "t-progress-update", taskType: "60-sec Answer", state: "upcoming" },
  { day: 26, week: 4, title: "Follow up by email", topicId: "t-client-followup", taskType: "90-sec Answer", state: "upcoming" },
  { day: 27, week: 4, title: "Client meeting", topicId: "t-client-followup", taskType: "Follow-up Challenge", state: "upcoming" },
  { day: 28, week: 4, title: "Final speaking review", topicId: "t-project-experience", taskType: "Weekly Review", state: "upcoming" },
];

/* ------------------------------------------------------------------ */
/* Upload analyzer sample files + generated clusters                   */
/* ------------------------------------------------------------------ */

export interface SampleFile {
  name: string;
  fileType: string;
  questions: number;
  topics: number;
  merged: number;
  bestFor: string;
  difficulty: string;
  clusters: {
    topicCluster: string;
    questions: number;
    module: string;
    topicId: string;
  }[];
}

export const sampleFiles: SampleFile[] = [
  {
    name: "IELTS Speaking Question Bank.pdf",
    fileType: "IELTS Speaking + Topic Discussion",
    questions: 142,
    topics: 31,
    merged: 27,
    bestFor: "IELTS speaking, topic development, fluency training",
    difficulty: "Beginner to Intermediate",
    clusters: [
      { topicCluster: "Self-introduction", questions: 12, module: "Interview Basics", topicId: "t-self-intro" },
      { topicCluster: "Teamwork", questions: 14, module: "Behavioral Interview", topicId: "t-teamwork" },
      { topicCluster: "Conflict Resolution", questions: 9, module: "Behavioral Interview", topicId: "t-conflict" },
      { topicCluster: "Handling Pressure", questions: 11, module: "Behavioral Interview", topicId: "t-pressure" },
      { topicCluster: "Failure Experience", questions: 8, module: "Behavioral Interview", topicId: "t-failure" },
      { topicCluster: "Business Travel Emergency", questions: 7, module: "Overseas Travel", topicId: "t-travel-emergency" },
    ],
  },
  {
    name: "Foreign Company Interview Questions.pdf",
    fileType: "Interview + Workplace English",
    questions: 126,
    topics: 28,
    merged: 34,
    bestFor: "Foreign-company interviews, project storytelling, workplace communication",
    difficulty: "Beginner to Upper-intermediate",
    clusters: [
      { topicCluster: "Self-introduction", questions: 12, module: "Interview Basics", topicId: "t-self-intro" },
      { topicCluster: "Project Experience", questions: 18, module: "Project Storytelling", topicId: "t-project-experience" },
      { topicCluster: "Teamwork", questions: 14, module: "Behavioral Interview", topicId: "t-teamwork" },
      { topicCluster: "Conflict Resolution", questions: 9, module: "Behavioral Interview", topicId: "t-conflict" },
      { topicCluster: "Meeting Communication", questions: 16, module: "Workplace English", topicId: "t-meeting-disagreement" },
      { topicCluster: "Client Follow-up", questions: 11, module: "Business English", topicId: "t-client-followup" },
    ],
  },
  {
    name: "Business English Scenarios.pdf",
    fileType: "Business + Client Communication",
    questions: 98,
    topics: 22,
    merged: 19,
    bestFor: "Client communication, negotiation, email and meeting English",
    difficulty: "Intermediate to Advanced",
    clusters: [
      { topicCluster: "Progress Update", questions: 13, module: "Workplace English", topicId: "t-progress-update" },
      { topicCluster: "Meeting Disagreement", questions: 10, module: "Workplace English", topicId: "t-meeting-disagreement" },
      { topicCluster: "Client Follow-up", questions: 15, module: "Business English", topicId: "t-client-followup" },
      { topicCluster: "Price Negotiation", questions: 12, module: "Business English", topicId: "t-price-negotiation" },
      { topicCluster: "Business Travel Emergency", questions: 9, module: "Overseas Travel", topicId: "t-travel-emergency" },
      { topicCluster: "Cross-functional Collaboration", questions: 11, module: "Workplace English", topicId: "t-cross-functional" },
    ],
  },
];

export const parseSteps = [
  "Reading file structure...",
  "Extracting questions...",
  "Grouping similar topics...",
  "Generating vocabulary and sentence patterns...",
  "Creating practice tasks...",
];

/* ------------------------------------------------------------------ */
/* Template center                                                     */
/* ------------------------------------------------------------------ */

export const templateCategories = [
  "All",
  "Interview",
  "Project Storytelling",
  "Behavioral Interview",
  "Workplace Meeting",
  "Email & LinkedIn",
  "Client Communication",
  "Overseas Travel",
];

export const lessonTemplates: LessonTemplate[] = [
  {
    id: "tpl-1",
    title: "LinkedIn Referral Message",
    category: "Email & LinkedIn",
    description: "Cold message that gets replies — short, specific, easy to say yes to.",
    content: `Hi [Name], I noticed that you work at [Company] as [Role].
I'm currently exploring opportunities in [Field], and I'm very interested in [Company] because of [Reason].
Would you be open to sharing a bit about your experience there?`,
  },
  {
    id: "tpl-2",
    title: "Thank-you Email After Interview",
    category: "Email & LinkedIn",
    description: "Reinforce one moment from the conversation, not a generic thanks.",
    content: `Hi [Name], thank you for the conversation today — especially the discussion about [specific topic].
It made the role even more concrete for me: [one sentence tying your skills to it].
I'm happy to provide anything else that helps, and I look forward to next steps.`,
  },
  {
    id: "tpl-3",
    title: "60-second Self-introduction",
    category: "Interview",
    description: "The 4-part intro: background, highlight, value, anchor.",
    content: `I'm currently a [role] at [company type], focused on [domain].
One thing I'm most proud of is [achievement with a number].
What I can bring to this role is [strength tied to their problem].
That's why this position caught my attention — [reason].`,
  },
  {
    id: "tpl-4",
    title: "Why Our Company — Research Brief",
    category: "Interview",
    description: "Structure your company research into a 3-point answer.",
    content: `I noticed you recently [concrete company fact — product, market move, launch].
That maps directly onto my experience with [your relevant work].
From my side, I could add value on [specific contribution].
So it feels like a two-way fit rather than just a brand name.`,
  },
  {
    id: "tpl-5",
    title: "CPADI Project Story",
    category: "Project Storytelling",
    description: "Context, Problem, Action, Decision, Impact — the full project answer.",
    content: `Context: The project was a [what] for [who], where I owned [scope].
Problem: The core problem was that [quantified pain].
Action: I led [key moves], working closely with [teams].
Decision: We made a deliberate trade-off between [X] and [Y] because [reason].
Impact: As a result, [metric] improved by [X%] within [timeframe].`,
  },
  {
    id: "tpl-6",
    title: "Quantify Your Impact — Verb Bank",
    category: "Project Storytelling",
    description: "Swap weak verbs for ownership verbs interviewers listen for.",
    content: `helped with → I led the redesign of ...
was involved in → I owned ...
worked on → I shipped ... within [timeframe]
made better → improved [metric] by [X%]
was part of the team → My specific contribution was ...`,
  },
  {
    id: "tpl-7",
    title: "STAR Answer Skeleton",
    category: "Behavioral Interview",
    description: "The universal behavioral frame — one line per stage, no rambling.",
    content: `Situation: One example that comes to mind is [project] where [constraint].
Task: My responsibility was to [goal].
Action: Instead of [default move], I [your deliberate choice].
Result: In the end, we [outcome + number].
Reflection: This experience taught me that [transferable lesson].`,
  },
  {
    id: "tpl-8",
    title: "Turning Weakness into Growth",
    category: "Behavioral Interview",
    description: "Answer 'what's your weakness' without self-sabotage.",
    content: `An area I've been working on is [real weakness].
It showed up when [honest example].
What I changed was [concrete system or habit].
The result: [evidence it's improving].
I'm not pretending it's solved — but it's managed and visible in my process now.`,
  },
  {
    id: "tpl-9",
    title: "Disagreeing in a Meeting (PREP)",
    category: "Workplace Meeting",
    description: "Push back on an idea while keeping the relationship intact.",
    content: `Point: I'd like to offer a different perspective on this.
Reason: My concern is that [risk], which would affect [stakeholder/outcome].
Example: When we tried [precedent], [what happened].
Point restated: So that's why I'd suggest [alternative] — but I'm open to what I'm missing.`,
  },
  {
    id: "tpl-10",
    title: "Progress Update — Done / Next / Blocked",
    category: "Workplace Meeting",
    description: "30-second standup script leadership actually wants to hear.",
    content: `Done: The [deliverable] is [status] as of [time].
Next: I'm moving to [next step], landing [date].
Blocked: I need [decision/resource] by [date], otherwise [consequence].
Bottom line: We're on/off track, with [dependency] worth watching.`,
  },
  {
    id: "tpl-11",
    title: "Client Follow-up That Moves the Deal",
    category: "Client Communication",
    description: "Need → Proposal → Next Step. Every follow-up advances a decision.",
    content: `Following up on [what] from [when].
Based on [their need], I'd recommend [proposal] because [reason tied to their numbers].
One thing worth deciding soon: [real deadline or constraint].
Could we lock [specific time] for [specific short meeting]? If easier, just reply with a time.`,
  },
  {
    id: "tpl-12",
    title: "Defending Your Price",
    category: "Client Communication",
    description: "Value → Anchor → Trade. Concede nothing without getting something.",
    content: `Before we talk numbers — the quote covers [value others don't include].
For this spec, the market range sits between [X] and [Y].
I can move to [number] if we can commit to [volume/term].
Below that, we'd have to cut corners I don't think you want.`,
  },
  {
    id: "tpl-13",
    title: "Flight Cancelled — Airline Counter Script",
    category: "Overseas Travel",
    description: "Calm, fact-first recovery when travel breaks.",
    content: `Good evening — my [flight] to [city] was cancelled, so I'd miss [commitment].
I see a [alternative routing] that lands [time].
Could you put me on standby for that one, and note the rebooking reason in my record?
While that's processing, I'll notify [client/hotel] with a fallback.`,
  },
  {
    id: "tpl-14",
    title: "Hotel Booking Missing — Front Desk Script",
    category: "Overseas Travel",
    description: "Solve the problem without escalating the emotion.",
    content: `Hi — I have a reservation under [name] for tonight, confirmation [number], but it's not showing in your system.
Could you check bookings under [alternative spelling/company rate] as well?
If it can't be found, what's the closest you can match: [rate] for [room type] tonight?
And could you print something documenting the issue for my company's travel desk?`,
  },
];

/* ------------------------------------------------------------------ */
/* Misc content                                                        */
/* ------------------------------------------------------------------ */

export const practiceMistakes = [
  "Too much background",
  "No clear personal contribution",
  "No measurable result",
  "Sounds like written English",
];

export const practiceExpressions = [
  "I led the redesign of...",
  "The main challenge was...",
  "My responsibility was...",
  "As a result...",
  "What I learned from this was...",
];
