const config = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'issue-number-required': ({ header }) => {
          const issuePattern =
            /^(feat|fix|refactor|design|docs|test|chore|setup|style|perf|ci|revert): #[1-9][0-9]* .+$/;

          const hotfixPattern = /^hotfix: .+$/;

          return [
            issuePattern.test(header) || hotfixPattern.test(header),
            '커밋 메시지는 "type: message" 형식으로 작성하고, 이슈 번호가 포함된 브랜치에서 커밋해야 합니다. 단, hotfix는 이슈 번호 없이 커밋할 수 있습니다.',
          ];
        },
      },
    },
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'design',
        'docs',
        'test',
        'chore',
        'setup',
        'style',
        'perf',
        'ci',
        'revert',
        'hotfix',
      ],
    ],
    'subject-case': [0],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'issue-number-required': [2, 'always'],
  },
};

export default config;
