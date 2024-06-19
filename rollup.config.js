import resolve from "@rollup/plugin-node-resolve"; // Для разрешения зависимостей из node_modules
import commonjs from "@rollup/plugin-commonjs"; // Для преобразования модулей CommonJS в ES6
import babel from "@rollup/plugin-babel"; // Для транспиляции современного JS и JSX
import svg from "rollup-plugin-svg"; // Для импорта SVG файлов
import postcss from "rollup-plugin-postcss"; // Для обработки CSS
import { terser } from "rollup-plugin-terser"; // Для минификации кода
import alias from "@rollup/plugin-alias"; // Для управления путями и алиасами
import replace from "@rollup/plugin-replace"; // Для замены переменных в коде

const production = !process.env.ROLLUP_WATCH; // Переменная для определения режима сборки

export default {
  input: "./src/index.js", // Указание на входной файл вашей библиотеки
  // Настройка выходных файлов
  output: [
    {
      file: "dist/index.es.js", // ES модуль
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/index.cjs", // CommonJS модуль
      format: "cjs",
      sourcemap: true,
    },
  ],
  // Плагины для обработки кода
  plugins: [
    replace({
      "var __assign = (this && this.__assign)":
        'var __assign = (typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this).__assign',
      "this.__assign": "undefined.__assign", // Замена для this в flatpickr
      delimiters: ["", ""],
      preventAssignment: true, // Не заменять значения переменных
    }),
    alias({
      // Пути и алиасы
      entries: [
        { find: "react", replacement: "preact/compat" },
        { find: "react-dom", replacement: "preact/compat" },
        { find: "../preact", replacement: "preact" },
        { find: "../preact/hooks", replacement: "preact/hooks" },
        { find: "../preact/jsx-runtime", replacement: "preact/jsx-runtime" },
      ],
    }),
    resolve({
      browser: true,
      extensions: [".js", ".jsx", ".json", ".node"],
      mainFields: ["browser", "module", "main"],
    }),
    commonjs({
      include: "node_modules/**",
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-transform-react-jsx"],
    }),
    postcss({
      extensions: [".css"],
      minimize: true,
      extract: "assets/styles.css",
    }),
    svg(),
    production &&
      terser({
        mangle: {
          reserved: ["RangeField", "formFields"],
          keep_classnames: true,
          keep_fnames: true,
        },
        compress: {
          drop_console: false,
          pure_funcs: ["RangeField", "formFields", "formFields.register"],
        },
        format: {
          comments: false,
        },
      }), // Минификация кода для продакшена
  ],
  external: [
    // "@bpmn-io/form-js",
    // "@bpmn-io/properties-panel",
    "luxon", // Поскольку luxon появляется в циклических зависимостях
    "flatpickr", // Если вы не используете flatpickr напрямую
  ],
};
