#!/usr/bin/env node
/**
 * 安装 Senior_QA_Expert 技能到 Claude Code 的 skills 目录。
 * 用法:
 *   npx github:QA-Ray/Senior_QA_Expert            # 装到全局 ~/.claude/skills/
 *   npx github:QA-Ray/Senior_QA_Expert --project   # 装到当前项目 ./.claude/skills/
 *   npx github:QA-Ray/Senior_QA_Expert --dir <路径> # 装到指定 skills 目录
 * 零依赖,只用 Node 内置模块。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL = 'Senior_QA_Expert';
const pkgRoot = path.resolve(__dirname, '..');     // 包根(含 SKILL.md / references)
const argv = process.argv.slice(2);

if (argv.includes('--help') || argv.includes('-h')) {
  console.log('用法: npx github:QA-Ray/Senior_QA_Expert [--project | --dir <skills目录>]');
  process.exit(0);
}

let base;
const di = argv.indexOf('--dir');
if (di !== -1 && argv[di + 1]) {
  base = path.resolve(argv[di + 1]);
} else if (argv.includes('--project')) {
  base = path.join(process.cwd(), '.claude', 'skills');
} else {
  base = path.join(os.homedir(), '.claude', 'skills');
}
const target = path.join(base, SKILL);

function copyItem(src, dst) {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const name of fs.readdirSync(src)) copyItem(path.join(src, name), path.join(dst, name));
  } else {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

try {
  fs.mkdirSync(target, { recursive: true });
  let copied = 0;
  for (const item of ['SKILL.md', 'references']) {
    const src = path.join(pkgRoot, item);
    if (fs.existsSync(src)) { copyItem(src, path.join(target, item)); copied++; }
  }
  if (copied === 0) throw new Error('包内未找到 SKILL.md / references,安装中止');
  console.log(`✅ Senior_QA_Expert 已安装到: ${target}`);
  console.log('   重载 Claude Code 后,对话里说 “用 Senior_QA_Expert,域=…,范围=…” 即可。');
} catch (e) {
  console.error('❌ 安装失败:', e.message);
  process.exit(1);
}
