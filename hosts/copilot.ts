import type { HostConfig } from '../scripts/host-config';

const copilot: HostConfig = {
  name: 'copilot',
  displayName: 'GitHub Copilot CLI',
  cliCommand: 'copilot',
  cliAliases: [],

  // Global personal skills: ~/.copilot/skills/ is the official Copilot CLI location.
  // Project skills: .github/skills/ is the primary supported location; hostSubdir
  // .copilot/ is a separate gitignored dir used only for build artifacts.
  globalRoot: '.copilot/skills/gstack',
  localSkillRoot: '.github/skills/gstack',
  hostSubdir: '.copilot',
  usesEnvVars: true,

  frontmatter: {
    mode: 'allowlist',
    keepFields: ['name', 'description'],
    descriptionLimit: null,
  },

  generation: {
    generateMetadata: false,
    skipSkills: ['codex'],
  },

  pathRewrites: [
    { from: '~/.claude/skills/gstack', to: '~/.copilot/skills/gstack' },
    // Explicit $HOME form must come before the substring .claude/skills/gstack rule,
    // otherwise $HOME/.claude/skills/gstack gets rewritten to $HOME/.github/skills/gstack.
    { from: '$HOME/.claude/skills/gstack', to: '$HOME/.copilot/skills/gstack' },
    { from: '.claude/skills/review', to: '.github/skills/gstack/review' },
    { from: '.claude/skills/gstack', to: '.github/skills/gstack' },
    { from: '.claude/skills', to: '.github/skills' },
  ],

  suppressedResolvers: [
    'DESIGN_OUTSIDE_VOICES',
    'ADVERSARIAL_STEP',
    'CODEX_SECOND_OPINION',
    'CODEX_PLAN_REVIEW',
    'REVIEW_ARMY',
    'GBRAIN_CONTEXT_LOAD',
    'GBRAIN_SAVE_RESULTS',
  ],

  runtimeRoot: {
    globalSymlinks: ['bin', 'browse/dist', 'browse/bin', 'design/dist', 'gstack-upgrade', 'ETHOS.md', 'review/specialists', 'qa/templates', 'qa/references', 'plan-devex-review/dx-hall-of-fame.md', 'plan-ceo-review/SKILL.md', 'plan-eng-review/SKILL.md', 'plan-design-review/SKILL.md'],
    globalFiles: {
      'review': ['checklist.md', 'design-checklist.md', 'greptile-triage.md', 'TODOS-format.md'],
    },
  },

  install: {
    prefixable: false,
    linkingStrategy: 'symlink-generated',
  },

  coAuthorTrailer: 'Co-Authored-By: GitHub Copilot <copilot@github.com>',
  learningsMode: 'basic',
};

export default copilot;
