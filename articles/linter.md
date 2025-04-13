# Linter para TypeScript 

Neste tutorial, você irá ver como aplicar na prática um linter para aplicações typescript, o typescript-lint. Para isso, iremos aplicar o linter na codebase do projeto Zero Óbito.

O **typescript-lint** é um adaptador de ESLint e Prettier para TypeScript.

---
## Setup
Faça um clone do projeto localmente:
```sh
git clone https://github.com/SocialSoftwareLivingLab/zerobito.git
```

## Passos
### 1. Checkout para o Commit mais recente do Zero Obito sem ESLint
```sh
git checkout a4496ff
```

### 2. Instalação das Ferramentas Necessárias
```sh
npm install --save-dev eslint-config-prettier eslint @eslint/js typescript typescript-eslint
```

### 3. Configuração do Linter (`eslint.config.mjs`)
```js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    // Regras recomendadas para TypeScript
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    
    // Indicação do arquivo `tsconfig`
    {
        languageOptions: {
            // define variáveis globais do browser, para o erro de variável nao   
            // definida nao ser apontado para as apis do browser
            globals: {
                ...globals.browser,
            },
            // localizacao do tsconfig
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    // Regras personalizadas
    {
        rules: {
            nomeDaRegra: 'opção'
        }
    },

    // Desabilita lint de TS em arquivos JS, mantendo regras recomendadas para JS
    {
        files: ['**/*.js'],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.disableTypeChecked
        ],
    },

    // Importação de regras que evitam conflitos com Prettier (deve ser a última para prioridade máxima)
    prettierConfig
);
```

### 4. Definição de Regras Customizadas
- Dentro da opção `tseslint.config()`, definimos um objeto `rules`, onde:
  - `off`: Desabilita a regra.
  - `warn`: Exibe um aviso sem gerar erro crítico.
  - `error`: Emite erro crítico.
- Podemos ter múltiplos objetos `rules`, que são mesclados automaticamente. Em caso de conflito, a última definição prevalece.

#### Exemplo de Configuração
```js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            "@typescript-eslint/adjacent-overload-signatures": "warn"
        }
    },
    {
        files: ['**/*.js'],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.disableTypeChecked
        ],
    },
    prettierConfig
);
```

- Referências de regras:
  - [Regras específicas do TypeScript](https://typescript-eslint.io/rules/)
  - [Regras específicas do JavaScript](https://eslint.org/docs/latest/rules/)

### 5. Executando o ESLint
Rodamos o linter apenas com as regras recomendadas pela comunidade, resultando em **295 erros** (principalmente relacionados ao uso do tipo `any` e falta de tratamento de erros).
```sh
npx eslint .
```

---

## Plugins e Lint para React
Podemos usar **plugins** para compartilhar regras de lint entre desenvolvedores. Um caso importante é o uso de regras específicas para React, como `eslint-plugin-react`.

### 1. Instalação do Plugin
```sh
npm install eslint-plugin-react --save-dev
```

### 2. Configuração do ESLint com React
```js
import eslint from '@eslint/js';
import tseslint, { plugin } from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';

export default tseslint.config(
    eslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            "@typescript-eslint/prefer-promise-reject-errors": "off"
        },
    },
    {
        files: ['**/*.js'],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.disableTypeChecked
        ],
    },
    prettierConfig
);
```

---

## Sobre o Prettier
- **Prettier** é um formatador de código que **aprimora a estilização do código**, sem alterar regras de lint.
- É **mais rápido que o ESLint** para verificação de padrões, pois não faz análise sintática.
- Para evitar conflitos entre ESLint e Prettier, desabilitamos regras conflitantes no ESLint através de `prettierConfig`.
- Para garantir **formatação consistente**, todos os desenvolvedores do time devem ter as mesmas configurações.

### 1. Criando Arquivo de Configuração `.prettierrc.json`
```json
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true
}
```

### 2. Instalar a Extensão do Prettier no VSCode
Para manter o código formatado automaticamente.

---

## 📌 **Repo**
- [Exemplo final](https://github.com/caiomelloni/zerobito/tree/applies-eslint)


## 📌 **Passos Extras**
- Instalar a extensão **ESLint da Microsoft** no VSCode para exibir os erros diretamente no editor.
- Para exibir todos os erros no editor, rodar uma task específica:
  ```sh
  ctrl + shift + p > Run Task > eslint: lint whole folder
  ```
- Configurar a opção `strictNullChecks` como `true` no `tsconfig.json`, garantindo que `null` e `undefined` sejam tratados corretamente pelo TypeScript.

---

## Configurações Extendidas
- [tseslint.configs.recommendedTypeChecked](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts)
- [tseslint.configs.strictTypeChecked](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict-type-checked.ts)
- [tseslint.configs.stylisticTypeChecked](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts)

