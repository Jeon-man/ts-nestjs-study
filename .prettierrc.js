const ALIAS_PREFIX = '@';

/**
 * @param  {string[]} paths
 * @param {string?} prefix
 * @returns {string}
 */
function alias(paths, prefix) {
  return `^${prefix ?? ALIAS_PREFIX}(${paths.join('|')})(/.+)?`;
}

/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  bracketSameLine: true,
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
  endOfLine: 'auto',

  importOrder: [
    alias(['nest']),
    '<THIRD_PARTY_MODULES>',
    // components & providers
    alias(['module', 'controller', 'service', 'provider', 'schedulers']),

    // api logic decorators
    alias(['middleware', 'guard', 'pipe', 'interceptor', 'decorator']),

    // types & definitions
    alias(['interface', 'model', 'dto', 'exception']),

    // etc
    alias(['util']),

    // other(nested, peer)
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'classProperties', 'decorators-legacy'],
};

module.exports = config;
