module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  plugins: [
    'vue'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
