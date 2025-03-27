export default {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Treat unused variables and redeclarations as warnings instead of errors
    'no-unused-vars': 'warn',  // Show warning instead of error
    'no-redeclare': 'warn',    // Show warning instead of error
    // Other custom rules can go here
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Apply these rules to TypeScript files as well
      rules: {
        'no-unused-vars': 'warn',  // Treat unused variables as warnings in TypeScript
        'no-redeclare': 'warn',    // Treat redeclarations as warnings in TypeScript
      }
    }
  ],
};
