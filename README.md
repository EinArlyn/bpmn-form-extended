# bpmn-form-extended

Библиотека предназначена для расширения компонентной базы bpmn-js. Позволяет добавлять кастомные компоненты в модель bpmn-js.

## Структура проекта

### assets - ресурсы

- `css` - папка с css файлами
- `fonts` - папка с шрифтами
- `js` - папка с js файлами
- `svg` - папка с svg файлами

### custom - кастомные компоненты

- `components` - папка с кастомными компонентами
- `properties-panel` - папка с кастомными панелями свойств
- `index.js` - файл для импорта всех кастомных компонентов

### form-js - переопределение функций библиотеки form-js

- `base-form.js` - переопределение базовых функций библиотеки form-js
- `form-editor.js` - описание и настройка редактора форм
- `form-viewer.js` - описание и настройка просмотра форм

## Как добавить собственный компонент

1. Создать папку компонента в папке `components`
2. Создать файл `index.js` в папке компонента
3. Реализовать компонент в файле `index.js`
4. Импортировать компонент в файл `index.js` в папке `custom/components`
5. Добавить класс компонента и зарегистрировать его
6. Добавить новый компонент в `RenderExtension`

## Как добавить собственную панель свойств

1. Создать папку панели свойств в папке `properties-panel`
2. Создать файл `index.js` в папке панели свойств
3. Реализовать панель свойств в файле `index.js`
4. Импортировать панель свойств в файл `index.js` в папке `custom/properties-panel`
5. Добавить класс панели свойств и зарегистрировать его
6. Добавить новую панель свойств в `PropertiesPanelExtension`

## Как добавить библиотеку в проект на Vue.js + Vite

1. Установить библиотеку при помощи npm

```bash
npm install @einarlyn/bpmn-form-extended
```

2. Импортируем css стили в файле `main.js`

```javascript
import "@einarlyn/bpmn-form-extended/assets/css/styles.css";
```

3. По пути `src/plugins` создаём файл `minifyBundles.ts` и помещаем в него следующий код

```typescript
import { minify } from "terser";

const minifyBundles = () => {
  return {
    name: "minifyBundles",
    async generateBundle(_options: any, bundle: any) {
      for (const key in bundle) {
        if (bundle[key].type === "chunk" && !key.includes("customFormEditor")) {
          const minifyCode = await minify(bundle[key].code, {
            sourceMap: false,
          });
          bundle[key].code = minifyCode.code;
        } else if (
          bundle[key].type === "chunk" &&
          key.includes("customFormEditor")
        ) {
          bundle[key].code = bundle[key].code.replaceAll(
            "formFields2",
            "formFields"
          );

          const minifyCode = await minify(bundle[key].code, {
            mangle: {
              reserved: ["RangeField", "formFields.register", "formFields"],
            },
            sourceMap: false,
          });
          bundle[key].code = minifyCode.code;
        }
      }
      return bundle;
    },
  };
};

export default minifyBundles;
```

4. В файле `vite.config.ts` добавляем добавляем свойство `optimizeDeps`

```json
optimizeDeps: {
    exclude: [
      '@einarlyn/bpmn-form-extended',
    ],
  },
```

5. В файле `vite.config.ts` добавляем плагин `minifyBundles`

```json
build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('bpmn-form-extended')) {
            return 'customFormEditor';
          }

          return 'app';
        },
      },
      plugins: [minifyBundles()],
    },
    minify: false,
  },
```
