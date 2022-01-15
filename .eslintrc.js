module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2018,
        sourceType: "module"
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "vue/require-default-prop": "off",
        "vue/no-v-html": "off",
        "vue/multi-word-component-names": "off",
        "@typescript-eslint/ban-ts-comment": "off"
    }
};
