// Importações de dependências
import globals from "globals";
import pluginJs from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import googleConfig from "eslint-config-google";

// Configuração do ESLint com o estilo Google e suporte ao TypeScript
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],           // Alvo para arquivos JS e TS
    languageOptions: {
      globals: globals.node,                    // Suporte aos globais do Node.js
      parser: tsParser,                         // Definição do parser TypeScript
    },
    ...googleConfig,                            // Aplicação do estilo Google
    plugins: {
      "@typescript-eslint": tsPlugin            // Plugin para TypeScript
    },
    rules: {
      ...pluginJs.configs.recommended.rules,    // Regras recomendadas do ESLint
      ...tsPlugin.configs.recommended.rules,    // Regras recomendadas do TypeScript
      
      // Adicione outras personalizações de regra, se desejar
    },
  },
];
