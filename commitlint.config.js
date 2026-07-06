const config = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'issue-number-required': ({ header }) => {
          const pattern =
            /^(feat|fix|refactor|design|docs|test|chore|setup|style|perf|ci|revert): #[0-9]+ .+$/;

          return [
            pattern.test(header),
            '커밋 메시지는 "type: #issueNumber message" 형식이어야 합니다.',
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
      ],
    ],
    'subject-case': [0],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'issue-number-required': [2, 'always'],
  },
};

export default config;
