// Builds public/llms-full.txt: the agent skill (quick reference) + the detailed Scheduler API from content/reference.md.
import fs from 'node:fs';

const skill = fs.readFileSync('public/skills/react-big-schedule/SKILL.md', 'utf8').replace(/^---[\s\S]*?---\n/, '');
const ref = fs.readFileSync('content/reference.md', 'utf8');
const api = ref.slice(ref.indexOf('\n# API'));

fs.writeFileSync(
  'public/llms-full.txt',
  `# React Big Schedule: full reference

> Free, MIT-licensed React calendar and resource scheduler (v9). Site: https://react-big-schedule.vercel.app . Source: https://github.com/ansulagrawal/react-big-schedule

${skill.trim().replace(/^# .*\n/, '')}

## Scheduler API (detailed)
${api}`,
);
