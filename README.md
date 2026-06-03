# Senior_QA_Expert — 资深测试专家(Claude Code 技能)

把"资深 QA 方法论"固化进 Claude Code 的技能:用分层测试思维设计**硬核**用例、独立评审把门、
**有据不捏造**地执行、5-Why 沉淀 BUG、维护「用例 ↔ Bug」状态联动;并支持按**域**加载专属漏测清单。

## 它强调什么
- **结果必须有据、严禁捏造**:能查证的真跑只读查询 / 接口、贴原样证据;查不到判 `Blocked`,绝不糊 `Pass`。
- **说人话**:用例标题与正文是大白话,不堆术语黑话。
- **评审硬门禁**:用例先过独立评审(不自评自过)才能执行。
- **只读优先、不擅动生产**:写 / 造数 / 施加交测试环境;agent 默认只读核对。
- **越用越全**:每测一个新域,把坑沉淀进 `references/domains/<域>.md`。

## 安装

**方式一:npx 一键装(推荐,需本机有 git + node)**
```bash
# 装到全局 ~/.claude/skills/(所有项目可用)
npx github:QA-Ray/Senior_QA_Expert

# 装到当前项目 ./.claude/skills/
npx github:QA-Ray/Senior_QA_Expert --project

# 装到指定 skills 目录
npx github:QA-Ray/Senior_QA_Expert --dir <你的 skills 目录>
```

**方式二:git clone**
```bash
# 全局
git clone https://github.com/QA-Ray/Senior_QA_Expert ~/.claude/skills/Senior_QA_Expert
# 或项目级
git clone https://github.com/QA-Ray/Senior_QA_Expert <你的项目>/.claude/skills/Senior_QA_Expert
```

两种装完后 `…/.claude/skills/Senior_QA_Expert/SKILL.md` 就位;重载 Claude Code 后可用。

## 用法
在对话里:
- 明说:`用 Senior_QA_Expert,域=钱包,范围=提现,设计测试用例`
- 或自然语言描述测试任务(分析需求 / 设计用例 / 执行测试 / 发现 bug …),命中即自动触发。

## 工作流(五阶段)
设计用例 → 评审(硬门禁)→ 执行(只读取证)→ 出 BUG(5-Why)→ 用例 ↔ Bug 状态同步。
成果物每个被测功能最多 3 个:`测试用例-<功能>.md` / `测试记录.md` / `BUG_LIST.md`。

## 结构
```
SKILL.md                       # 主流程(设计 → 评审 → 执行 → BUG → 状态同步)
references/
  test-design-checklist.md     # 通用分层硬核场景清单(任何域都过)
  domains/
    README.md
    wallet.md                  # 示例域:加密钱包(充提 / 归集 / 资产 / 链特性)
package.json / bin/install.js  # npx 安装器(把上面文件拷到 .claude/skills/)
```

## 加新域
首次测到一个新域(合约 / 现货 / 风控 / 支付 / 签名…),照 `references/domains/wallet.md` 的格式新建 `references/domains/<域>.md`,
把该域的坑沉淀进去——技能会越用越全。
