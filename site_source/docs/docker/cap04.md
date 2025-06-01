---
id: cap-4
title: 04 - Repositório de imagens
sidebar_position: 4
---

# Capítulo 4 - Repositório de imagens

Neste capítulo, vamos aprender a criar um repositório de imagens Docker. Um repositório é um local onde as imagens Docker são armazenadas e podem ser compartilhadas com outros usuários.

Vamos usar o **Docker Hub** como nosso repositório. O Docker Hub é como uma galeria gigante onde as pessoas exibem suas obras de arte — que, neste caso, são imagens Docker. É um lugar onde você pode compartilhar suas criações e descobrir imagens incríveis feitas por outros entusiastas do Docker. Seja você novo no Docker ou ainda se adaptando, o Docker Hub é como um ponto de encontro da comunidade para tudo relacionado a containers.

:::tip
Você também pode usar outros serviços, como o **GitHub Container Registry**, **GitLab Container Registry**, **AWS ECR**, ou até mesmo criar seu próprio repositório privado.
:::

## 🧑‍💻 Criando uma Conta no Docker Hub

Acesse [Docker Hub](https://hub.docker.com/) e crie uma conta gratuita. É rápido e fácil!

## 🔐 Fazendo Login no Docker Hub

Para compartilhar suas imagens no Docker Hub, você precisa estar autenticado. Use o comando:

```bash
docker login
```

Forneça seu nome de usuário e seu token de acesso (que pode ser gerado na sua conta do Docker Hub).

:::info
Caso prefira, você também pode gerar tokens de acesso no Docker Hub em vez de usar sua senha diretamente.
:::

## 🏷️ Renomeando Imagens

Às vezes, você pode querer dar um nome diferente às suas imagens antes de enviá-las para o Docker Hub, seja para controle de versões ou organização.

Use o comando:

```bash
docker image tag nome-antigo nome-novo
```

Por exemplo:

```bash
docker image tag minha-imagem:1.0 minha-imagem:2.0
```

:::warning
O Docker Hub diferencia maiúsculas de minúsculas! Portanto, `minha-imagem` e `Minha-Imagem` são nomes distintos.
:::

No nosso exemplo, vamos renomear a imagem criada no capítulo anterior (`my-node-app`) para seguir a convenção do Docker Hub (`seu-usuario/my-node-app:1.0`):

```bash
docker image tag my-node-app seu-usuario/my-node-app:1.0
```

> 🔧 Substitua `seu-usuario` pelo seu nome de usuário no Docker Hub.

## 🚀 Enviando Imagens para o Docker Hub

Agora que sua imagem está renomeada, envie-a com:

```bash
docker push seu-usuario/my-node-app:1.0
```

Se tudo estiver certo, você verá logs indicando o progresso do upload da sua imagem.

## 📥 Baixando Imagens do Docker Hub

Para baixar uma imagem do Docker Hub, use:

```bash
docker pull seu-usuario/my-node-app:1.0
```

Isso faz o download da imagem para sua máquina local.

:::note
Esse comando serve para qualquer imagem disponível no Docker Hub, não apenas as suas.
:::

## ▶️ Rodando um Container com a Imagem do Docker Hub

Execute sua imagem normalmente, como faria com qualquer imagem local:

```bash
docker run -p 3000:3000 seu-usuario/my-node-app:1.0
```

Sua aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

---

## 🎉 Encerramento

Parabéns! Agora você sabe como criar, renomear e compartilhar imagens Docker no Docker Hub. 🔥

Isso abre um mundo de possibilidades: você pode colaborar com outros desenvolvedores, compartilhar suas soluções e aproveitar as milhares de imagens disponíveis na comunidade.

No próximo capítulo, vamos aprender como **gerenciar containers e imagens de forma mais avançada**. Até lá, continue praticando, experimentando e se divertindo com Docker! 🚀

---

## 📚 Resumo

- ✅ Criamos uma conta no Docker Hub.
- ✅ Aprendemos a fazer login no terminal.
- ✅ Renomeamos imagens usando `docker tag`.
- ✅ Enviamos imagens para o Docker Hub com `docker push`.
- ✅ Baixamos imagens com `docker pull`.
- ✅ Executamos containers a partir de imagens do Docker Hub
