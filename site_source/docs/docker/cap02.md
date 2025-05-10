---
id: primeiros-comandos
title: 02 - Primeiros comandos
sidebar_position: 2
---

# Capítulo 2: O Começo de Tudo 🚀

Agora que você já entendeu para que serve o Docker, chegou a hora de colocar a mão na massa! Existem muitos comandos e possibilidades, então vamos por partes. Não se preocupe em decorar tudo — isso vem com o tempo. O ideal é conhecer os principais comandos agora e aprender o resto conforme a necessidade.

## Checando a Versão

Vamos começar com algo simples. Para saber qual versão do Docker está instalada:

```bash
docker --version
```

O resultado será algo assim:

```bash
Docker version 28.0.4, build b8034c0
```

:::tip Curiosidade
Você pode usar `docker version` (sem o `--`) para ver informações detalhadas do client e do server.
:::

## Colocando Containers em Movimento

Vamos supor que você tenha uma imagem chamada `my-image`. Para criar um container baseado nela, usamos:

```bash
docker run my-image
```

Mas calma... De onde vem essa imagem? Como criar uma? **Já vamos chegar lá!** Por enquanto, experimente o seguinte:

```bash
docker run ubuntu
```

🤔 **Percebeu algo estranho?** O Docker baixou a imagem... e mais nada aconteceu. O que rolou?

Na verdade, o container foi iniciado e *parado imediatamente*, porque não dissemos o que ele deveria fazer. Ele está lá, parado, aguardando ordens.

---

Agora tente:

```bash
docker run -td ubuntu
```

De novo... nada visível. Mas agora é diferente! Esse container **está rodando em segundo plano**.

### Entendendo as opções:
- `-d` → *detached mode*: roda em segundo plano.
- `-t` → aloca um pseudo-terminal (importante para rodar shells).

A ideia é que o container fique disponível sem bloquear o seu terminal.

:::info Quando usar o modo detached?
Sempre que quiser rodar algo contínuo, como um servidor, ou interagir com o container por outros comandos.
:::

---

Se quiser **entrar dentro do container** e interagir com ele, use:

```bash
docker run -it ubuntu
```

🎉 Agora sim! Você está *dentro* de um container Ubuntu, como se tivesse uma mini-máquina rodando dentro do seu PC.

Para sair:

```bash
exit
```

## Checando os Containers

Rodamos `docker run` **três vezes**, certo? Então temos três containers.

Para ver os que estão ativos:

```bash
docker ps
```

Saída esperada:

```bash
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

Apareceu só **um**? Isso é normal. O `docker ps` mostra **somente containers ativos**.

Para listar **todos**, mesmo os parados:

```bash
docker ps -a
```

Agora sim, os três estão lá!

## Checando as Imagens

Quer ver quais imagens estão no seu computador?

```bash
docker images
```

Imagens são modelos, então **não têm estado**. Esse comando lista todas as imagens locais.

### Baixando imagens do Docker Hub

```bash
docker pull nginx
```

Isso vai baixar a imagem oficial do Nginx.

Verifique novamente:

```bash
docker images
```

Lá está ela! Repare no `IMAGE ID` — você vai precisar disso para manipular a imagem.

### Deletando uma imagem

```bash
docker rmi <IMAGE ID>
```

Exemplo:

```bash
docker rmi a1b2c3d4e5f6
```

:::warning
Você só pode deletar imagens **não utilizadas por containers ativos**. Pare ou remova os containers antes, se necessário.
:::

## Pare e Ande! 🛑▶️

Para parar um container:

```bash
docker stop <CONTAINER ID>
```

E para iniciar de novo:

```bash
docker start <CONTAINER ID>
```

Experimente parar e iniciar aquele container Ubuntu que deixamos em segundo plano.

## Dizendo Adeus 👋

Para deletar um container (lembre-se: ele precisa estar parado!):

```bash
docker rm <CONTAINER ID>
```

Para deletar imagens:

```bash
docker rmi <IMAGE ID>
```

Diga tchau com responsabilidade. 😅

## Dando Ordens aos Containers

Agora que você sabe o ID ou nome de um container, pode mandar comandos direto para ele.

```bash
docker exec -it <container> <comando>
```

### Exemplo:

1. Crie um container em segundo plano:

    ```bash
    docker run -td ubuntu
    ```

2. Descubra seu nome ou ID:

    ```bash
    docker ps
    ```

3. Liste os diretórios do container:

    ```bash
    docker exec -it <id ou nome> ls
    ```

Simples e poderoso.

## Lendo Logs dos Containers

Alguns containers geram logs enquanto rodam.

Vamos ver isso em ação:

```bash
docker run -td redis
docker ps
docker logs <ID ou nome>
```

Logs são úteis para entender o que está acontecendo por dentro. Nem todas as imagens geram logs por padrão — mas você vai ver mais disso em breve.

## 🧠 Resumo

Neste capítulo, você aprendeu:

✅ Como verificar a versão do Docker  
✅ Como rodar containers em modo interativo ou em segundo plano  
✅ Como listar e gerenciar containers e imagens  
✅ Como executar comandos em containers ativos  
✅ Como ler logs gerados pelos containers

---

📌 **Exercício recomendado**:
- Rode alguns containers
- Interaja com eles
- Pare, inicie e delete tudo no final

A prática vai te deixar afiado pro que vem a seguir. Até o próximo capítulo! 🚢
