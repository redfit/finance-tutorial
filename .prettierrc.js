module.exports = {
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  endOfLine: "auto",
  importOrder: [
    "^[./]",
    "^(next/(.*)$)|^(next$)",
    "^(react/(.*)$)|^(react$)",
    "^[a-zA-Z](.*)$",
    "^@(?!/)(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@/components/(.*)$",
    "^@/hooks/(.*)$",
    "^@/lib/(.*)$",
    "^@/config/(.*)$",
    "^@/(.*).css$",
    "^@/styles/(.*)$",
    "^types$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
}
