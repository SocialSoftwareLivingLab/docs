## 📚 S2L2 Educacional (Versão em Português-BR)

![Conteúdo: Documentação](https://img.shields.io/badge/conteúdo-documentação-007ec6.svg?style=for-the-badge\&logo=markdown\&logoColor=white)
![Objetivo: Aprendizado](https://img.shields.io/badge/objetivo-aprendizado-4c1.svg?style=for-the-badge\&logo=githubactions\&logoColor=white)

O **S2L2 (Social Software Living Lab)** é uma iniciativa do setor público voltada à disseminação de conhecimento e ao fortalecimento da educação em tecnologias sociais e software livre. Este repositório abriga os metadados, conteúdos e materiais de apoio do [site educacional oficial do S2L2](https://socialsoftwarelivinglab.github.io/docs/).

A plataforma foi desenvolvida com o framework [Docusaurus](https://docusaurus.io/), que oferece uma estrutura acessível, organizada e responsiva para visualização e manutenção da documentação.

---

### 🤝 Contribuindo com o Projeto

Contribuições são muito bem-vindas! Você pode colaborar de diversas formas:

* Criando ou melhorando conteúdos educacionais
* Corrigindo erros de ortografia, gramática ou formatação
* Reportando problemas via *issues*
* Sugerindo melhorias
* Submetendo *pull requests*

> Ao criar uma *issue*, use as etiquetas (*labels*) adequadas para facilitar o gerenciamento.
> Ao submeter uma *pull request*, certifique-se de seguir as diretrizes de estrutura dos arquivos e boas práticas de Markdown.

---

### 🛠️ Estrutura e Desenvolvimento

Os conteúdos do site são feitos em Markdown que, posteriormente, é convertido em html pela pipeline do projeto. Para escrever boas documentações,
saber Markdown é o suficiente. Toda submissão na branch main tem deploy automático no site oficial do S2L2. 

Para saber como turbinar o seu Markdown com o docusaurus, [explore a documentação oficial](https://docusaurus.io/docs/markdown-features)

Caso queira visualizar o site localmente, você precisará do **Node.js** instalado. Depois de clonar o repositório, execute os comandos abaixo dentro do diretório `site_source`:

```bash
npm install
npm run start
```

Esses comandos iniciarão um servidor local com recarregamento automático, permitindo ver em tempo real as alterações feitas nos arquivos Markdown.

---

### ✍️ Guia de Edição de Conteúdo

#### 🗂️ Cursos

Todos os cursos devem ser adicionados ao diretório [`site_source/cursos`](./site_source/cursos). Cada curso deve ser criado como um subdiretório cujo nome será exibido como o título na aba de cursos do site.

* Cada capítulo do curso deve estar em um arquivo Markdown (`.md`)
* Como exemplo de estrutura, consulte o curso de [Docker](./site_source/cursos/Docker/cap01.md)
* Utilize o frontmatter (bloco inicial com `---`) corretamente para título, descrição e ordem dos capítulos

#### 🧭 Curadoria de Conteúdo

A curadoria é um recurso que organiza links, recursos externos e sugestões relevantes de aprendizado. Ela está localizada no arquivo [`curadoria.md`](./site_source/src/pages/curadoria.md). Edite esse arquivo diretamente para adicionar ou modificar entradas.

#### 🎯 Página de Desafios (PBL - Project-Based Learning)

Os desafios estão no diretório [`site_source/src/pages/pbl`](./site_source/src/pages/pbl). A estrutura dos arquivos é intuitiva: cada desafio é um arquivo Markdown com a descrição do problema e seus requisitos.

* Adicione um novo desafio criando um novo arquivo `.md` nesse diretório
* Use exemplos existentes como base para manter a consistência

---

## 📚 S2L2 Educational (English Version)

![Content: Documentation](https://img.shields.io/badge/content-documentation-007ec6.svg?style=for-the-badge\&logo=markdown\&logoColor=white)
![Goal: Learning](https://img.shields.io/badge/goal-learning-4c1.svg?style=for-the-badge\&logo=githubactions\&logoColor=white)

**S2L2 (Social Software Living Lab)** is a public-sector initiative focused on sharing knowledge and strengthening education in social technologies and free/libre software. This repository hosts the metadata, content, and support materials for the [official S2L2 educational website](https://socialsoftwarelivinglab.github.io/docs/).

The platform is built using the [Docusaurus](https://docusaurus.io/) documentation framework, which offers an accessible, well-organized, and responsive structure for browsing and maintaining content.

---

### 🤝 Contributing

We welcome and encourage contributions of all kinds! You can collaborate by:

* Creating or improving educational content
* Fixing typos, grammar, or formatting issues
* Reporting problems through issues
* Suggesting new ideas or enhancements
* Submitting pull requests

> When opening an issue, please use relevant labels to help organize and triage tasks.
> When submitting a pull request, follow our file structure guidelines and Markdown best practices.

---

### 🛠️ Development & Structure

#### Prerequisites

To run the site locally, you will need **Node.js** installed. After cloning the repository, run the following commands inside the `site_source` directory:

```bash
npm install
npm run start
```

This will launch a local development server with live-reload functionality, so you can preview your Markdown changes in real-time.

---

### ✍️ Content Editing Guide

#### 🗂️ Courses

All courses are located in the [`site_source/cursos`](./site_source/cursos) directory. Each course should be organized as its own folder, and the folder name will be displayed as the course title on the site.

* Each chapter should be a separate Markdown (`.md`) file
* Use the [Docker course](./site_source/cursos/Docker/cap01.md) as a base reference for structure
* Remember to include frontmatter (YAML between `---`) for titles, descriptions, and chapter order

#### 🧭 Curated Resources

The curated content page provides links and recommendations for further learning. This can be edited by modifying the [`curadoria.md`](./site_source/src/pages/curadoria.md) file directly.

#### 🎯 Challenges Page (PBL - Project-Based Learning)

Challenges are located in the [`site_source/src/pages/pbl`](./site_source/src/pages/pbl) directory. Each challenge is written as a Markdown file describing the problem and requirements.

* Add a new challenge by creating a new `.md` file
* Use the existing files as templates to ensure consistency

---
