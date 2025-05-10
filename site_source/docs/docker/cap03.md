---
id: cap-3
title: 03 - Imagens
sidebar_position: 3
---

# Capítulo 3: Imagens Autorais 🚀

Até que enfim! Agora vamos aprender a **criar nossas próprias imagens Docker**. Com elas, podemos desenvolver containers personalizados e começar a dominar o poder do Docker. 💡

## Dockerfile: A Receita Mágica 🧑‍🍳

Para criar nossas imagens, vamos utilizar um arquivo especial chamado `Dockerfile`. Isso mesmo, **sem extensão** e com esse nome exato! O `Dockerfile` contém uma linguagem de script própria e funciona como uma **receita** para a criação da imagem. E a imagem, por sua vez, é a base do container. Vamos aprender a criar uma imagem simples para um servidor Node.js.

### Criando o Projeto

Abra um terminal e crie um diretório para o nosso exemplo. Dentro dele, crie o arquivo `app.js` com o código do nosso servidor:

```nodejs
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello, Docker! 🚀");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
```

Em seguida, inicie o gerenciamento de dependências:

```sh
npm init
```

Você verá algo assim no final:

```json
{
  "name": "example-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "test": "echo 'Error: no test specified' && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.21.2"
  }
}
```

Agora, adicione o **Express** como dependência de desenvolvimento:

```sh
npx add-dependencies --dev express
```

### O Dockerfile

Agora, vamos para a parte interessante! Crie um arquivo chamado `Dockerfile` que vai definir o que nosso container precisa para funcionar. O Dockerfile especifica desde a imagem base até as instruções para instalar dependências e executar a aplicação. 

Crie o arquivo com o comando:

```sh
touch Dockerfile
```

Dentro dele, cole o seguinte conteúdo:

```Dockerfile
# Usa a imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos para o container
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta que o app irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "app.js"]
```

Agora, vamos destrinchar cada parte desse arquivo!

## 📝 Comentários

Tudo que vem após um `#` é um **comentário** e não afeta a construção da imagem. Use-os sempre que quiser explicar alguma coisa no seu script!

## 🛠️ Imagens Base

Ao criar nossa imagem, podemos **herdar** de outra imagem, como é o caso da imagem `node:18-alpine`:

```Dockerfile
FROM node:18-alpine
```

Isso cria um container com o Node.js já instalado. E você pode escolher qualquer outra imagem que atenda à sua aplicação!

:::tip
**Dica:** Sempre que possível, tente usar imagens **alpine**. Elas são mais leves, o que faz a construção do container ser mais rápida e eficiente!
:::

## 📂 Definindo o Local de Trabalho

Dentro do container, a estrutura de pastas funciona como uma máquina virtual. Podemos definir o diretório onde as operações subsequentes ocorrerão:

```Dockerfile
WORKDIR /app
```

Isso significa que todas as operações subsequentes (como `COPY`, `RUN`, etc.) ocorrerão dentro do diretório `/app`.

## 📦 Inserindo Arquivos no Container

Para que os arquivos do nosso projeto cheguem ao container, usamos o comando `COPY`:

```Dockerfile
COPY . .
```

Isso copia tudo do diretório atual para dentro do container. Como definimos o diretório de trabalho como `/app`, os arquivos serão colocados lá.

## 🔧 Rodando Comandos

Quando estamos criando a imagem, podemos executar comandos no container. Um exemplo disso é a instalação das dependências:

```Dockerfile
RUN npm install
```

Esse comando roda dentro do container para instalar as dependências descritas no `package.json`.

## 🌐 Expondo Portas

Para que o container possa se comunicar com o mundo exterior, precisamos expor uma porta. No nosso caso, a porta 3000:

```Dockerfile
EXPOSE 3000
```

Assim, o container estará acessível através da porta 3000.

## 🚀 Definindo o Ponto de Entrada

Sempre que o container iniciar, podemos definir um comando que será executado automaticamente. Como estamos criando um servidor, queremos que ele inicie sempre que o container rodar:

```Dockerfile
CMD ["node", "app.js"]
```

Isso executa o comando `node app.js` quando o container for iniciado. A sintaxe é como se fosse uma lista (array), onde cada parte do comando é um item.

## 🚫 Ignorando Arquivos

Às vezes, não queremos que certos arquivos sejam copiados para o container. Crie um arquivo `.dockerignore` com o seguinte conteúdo:

```sh
node_modules
npm-debug.log
```

Isso garante que, por exemplo, a pasta `node_modules` não seja copiada para dentro do container. Temos um comportamento
semelhante ao `.gitignore`.

## 🚧 Construindo a Imagem

Agora que temos o `Dockerfile`, podemos construir nossa imagem com o comando:

```sh
docker build -t my-node-app .
```
:::warning
**Importante:** O comando `docker build -t <nome_da_imagem> .` deve ser executado no mesmo diretório onde o seu Dockerfile está. Caso contrário, o Docker não encontrará o arquivo de construção. Se o arquivo não estiver no mesmo diretório, então
podemos substituir o "." pelo caminho até o Dockerfile
:::

Aqui, `my-node-app` é o nome da imagem e `.` indica que o Dockerfile está no diretório atual.

## 🛠️ Rodando o Container

Agora que nossa imagem está criada, podemos ver todas as imagens disponíveis com:

```sh
docker images
```

Para rodar o container, use o comando `docker run`:

```sh
docker run -p 3000:3000 my-node-app
```

Isso mapeia a porta 3000 do seu container para a porta 3000 da máquina local.

---

## 🎉 Parabéns!

Agora você tem um **container personalizado** rodando uma aplicação Node.js! Acesse sua aplicação em http://localhost:3000 e veja o **"Hello, Docker!"**.

---

:::warning
**Atenção:** Lembre-se de sempre testar seu Dockerfile localmente antes de tentar usá-lo em um ambiente de produção. Isso ajuda a evitar surpresas.
:::
