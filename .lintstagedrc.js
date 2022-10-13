const eslint = 'eslint --fix';
const prettier = 'prettier --write';
const jest = 'jest --findRelatedTests --forceExit --detectOpenHandles --passWithNoTests';

module.exports = {
  '**/*.{ts,tsx,js,jsx}': [eslint, jest],
  '**/*.{json,css,md,scss,sass,less,yml,yaml,html,svg}': [prettier],
};
