module.exports = {
  '*.js': [
    'yarn lint:eslint',
    // 'yarn lint:prettier',
    'git add'
    // 'yarn test:unit:file',
  ],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
    // 'yarn lint:prettier --parser json',
    'git add'
  ],
  'package.json': ['git add'],
  '*.vue': [
    'yarn lint:eslint',
    'yarn lint:stylelint'
    // 'yarn lint:prettier'
    // 'yarn test:unit:file',
  ],
  '*.scss': ['yarn lint:stylelint', 'git add'],
  '*.md': ['yarn lint:markdownlint', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['git add']
}
