import Link from '@docusaurus/Link';

# 🧩 Desafio 01 — Personal Blogging Platform API

:::info
Nível: **Iniciante** | Duração estimada: **4 a 6 horas**
:::

## 🎯 Objetivo

Crie uma **API RESTful** para um blog pessoal com funcionalidades completas de criação, leitura, atualização e remoção de artigos. Este desafio é ideal para praticar conceitos fundamentais do backend com Node.js e TypeScript.

---

## 📘 Especificação da Aplicação

Sua API deve manipular **artigos** com a seguinte estrutura:

- **Título**: texto, máximo de 50 caracteres
- **Conteúdo**: texto, máximo de 5000 caracteres
- **Data**: `timestamp` de publicação ou da última atualização
- **Tag**: texto opcional, máximo de 16 caracteres e **sem espaços**

---

## 🛠️ Funcionalidades Requeridas

### 1. **Listar todos os artigos**
- Endpoint: `GET /artigos`
- Deve retornar todos os artigos
- Pode aceitar filtros opcionais por `data` e/ou `tag`

### 2. **Resgatar artigo por ID**
- Endpoint: `GET /artigos/:id`
- Retorna um artigo específico
- Se não encontrado, retorne status apropriado com mensagem de erro

### 3. **Criar um novo artigo**
- Endpoint: `POST /artigos`
- Campos obrigatórios: `título`, `conteúdo`
- Opcional: `tag`
- Valide títulos duplicados
- Data deve ser gerada automaticamente

### 4. **Excluir um artigo**
- Endpoint: `DELETE /artigos/:id`
- Se não existir, retorne erro apropriado

### 5. **Atualizar um artigo**
- Endpoint: `PUT /artigos/:id`
- Pelo menos um dos campos (`título`, `conteúdo`, `tag`) deve ser alterado
- Atualize a `data` automaticamente
- Valide se nenhum campo foi enviado

---

## 📚 Conceitos Necessários

<details>
  <summary><strong>💡 Antes de começar, revise os seguintes temas:</strong></summary>

### 🧪 Backend com Node.js e TypeScript
- [Aprenda TypeScript com a Microsoft](https://www.typescriptlang.org/pt/docs/)
- [Fundamentos do Node.js](https://nodejs.dev/en/learn)
- [Curso gratuito de Node.js + TypeScript (CodeDrops)](https://www.youtube.com/watch?v=8yG1itP8KzM)

### 🌐 APIs RESTful
- [O que é o protocolo HTTP? (MDN)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview)
- [Criando rotas HTTP com Express.js](https://expressjs.com/pt-br/)

### 🔐 Validação de dados
- [Validação com Zod (TypeScript)](https://zod.dev/)
- [Express-validator (Node.js)](https://express-validator.github.io/docs/)

### 🗃️ Banco de Dados e Modelagem
- [Introdução ao MongoDB](https://www.mongodb.com/docs/manual/introduction/)
- [Curso de MongoDB para iniciantes (freeCodeCamp - em português)](https://www.youtube.com/watch?v=HlFbp1fG4Zw)

### 📦 Organização do projeto e boas práticas
- [Princípios de Clean Code (resumo traduzido)](https://medium.com/@matheus_goncalves/clean-code-princ%C3%ADpios-para-escrever-c%C3%B3digos-melhores-e61fca79f56d)
- [Como estruturar uma API em Node.js (Rocketseat)](https://www.youtube.com/watch?v=Gfuw7wTNbPA)

### 🧪 Testes (opcional, mas recomendado)
- [Documentação oficial do Jest](https://jestjs.io/)
- [Testando APIs com Jest + Supertest](https://blog.rocketseat.com.br/testes-automatizados-com-jest/)

</details>

---

## ✅ Critérios de Avaliação

| Requisito                                     | Obrigatório |
|-----------------------------------------------|-------------|
| CRUD completo de artigos                      | ✅           |
| Validações de entrada                         | ✅           |
| Uso de banco de dados (ex: MongoDB)           | ✅           |
| Organização do código                         | ✅           |
| Respostas adequadas para erros                | ✅           |
| Documentação mínima (README com instruções)   | ✅           |
| Testes automatizados                          | ⚪️ (opcional)|
| Autenticação e deploy                         | ⚪️ (extra)   |

---

## 🚀 Extras (para quem quiser ir além!)

- 🔐 Autenticação de rotas com JWT
- 📄 Documentação da API com Swagger
- 🌐 Deploy no Render, Vercel ou Railway
- 👥 Gerenciamento de usuários e perfis

---

## 📤 Como Submeter

1. Crie um repositório no GitHub com nome `personal-blog-api`
2. Escreva um `README.md` com:
   - Descrição da API
   - Endpoints documentados
   - Instruções para rodar localmente
3. Opcional: suba sua API em algum serviço gratuito de deploy
4. Compartilhe sua solução via [Pull Request no repositório do PBL](https://github.com/s2l2/pbl)

---

## 💬 Dúvidas ou sugestões?

Abra uma [issue no GitHub](https://github.com/s2l2/pbl/issues) ou venha conversar com a comunidade!

---

👉 [Voltar à lista de desafios](./intro)
