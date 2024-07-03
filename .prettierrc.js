module.exports = {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  endOfLine: 'auto',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '^types$',
    '^@(?!/)(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[a-z](.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^@/(.*).css$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}
