---
id: por-que-docker
title: 01 - Por que Docker?
sidebar_position: 1
---

# Capítulo 1: Por que Docker?

:::info
**Docker? Mas por quê?**

Essa é uma pergunta essencial para qualquer pessoa que desenvolve ou distribui aplicações nos dias de hoje.
:::

Em um mundo moderno com aplicações cada vez mais complexas, a **distribuição de software** se tornou uma etapa crítica. Muito provavelmente, a aplicação final que você está desenvolvendo **não vai rodar oficialmente só na sua máquina**.

Claro, enquanto você está programando, o seu computador é o centro do universo: executa os testes, recebe os incrementos... Mas, quando chega a hora de publicar seu software em um servidor (ou em qualquer outro lugar onde ele vá rodar), aparecem as temidas **diferenças de ambiente**.

Essas diferenças podem ser tão grandes que:

- A aplicação simplesmente não roda.
- Ou pior: **funciona até certo ponto... e depois falha misteriosamente.**

## Onde entra o Docker?

É aqui que entra a **genialidade do Docker**.

Com essa ferramenta, você pode empacotar sua aplicação de forma que ela **roda do mesmo jeito em qualquer lugar** — sem depender das particularidades do ambiente onde será executada.

Antes do Docker, isso só era possível com muito esforço técnico (ou um pouco de sorte 😅).

Aqui vão algumas vantagens importantes do Docker:

- ✅ **Consistência:** Seu código roda da mesma forma em qualquer ambiente.
- 🔒 **Isolamento:** Bugs no seu app não afetam a máquina onde ele roda. Se algo quebrar, fique tranquilo: o servidor continua de pé.
- ⚡ **Eficiência:** Containers usam os recursos da máquina host de forma otimizada, com **overhead mínimo** (bem diferente de máquinas virtuais).
- 📦 **Escalabilidade:** Quer rodar várias instâncias ou distribuir em várias máquinas? Docker facilita isso com estilo.

---

## Primeiros Passos com Docker

### 🐳 Instalação

Se você usa **Mac** ou **Windows**, o caminho mais prático é instalar o **Docker Desktop**. Baixe diretamente do [site oficial](https://www.docker.com/products/docker-desktop).

Se você é do time **Linux**, existem duas opções:

1. Instalar o Docker Desktop (sim, ele também existe pra Linux).
2. Instalar o Docker Engine via linha de comando.

O processo depende da sua distribuição e gerenciador de pacotes. Uma busca rápida no Google com `"instalar Docker no Ubuntu"` ou `"Docker Fedora"` deve resolver.

:::tip
Dica: O site oficial também tem [documentação de instalação por distro](https://docs.docker.com/engine/install/).
:::

---

### 🚀 Rodando Seu Primeiro Container

Mas... o que é um *container*?

Um container é um **ambiente isolado** criado pelo Docker onde sua aplicação vai rodar, utilizando os recursos da máquina host.

Vamos começar com um exemplo simples. No terminal, digite:

```bash
docker run hello-world
```
Você deve ver uma saída parecida com esta:
```bash
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

Pronto! Acabamos de rodar o primeiro container! 🎉

Nesse processo, o Docker:
1. Baixou a imagem hello-world:latest;
2. Criou um container com base nessa imagem;
3. Executou uma pequena aplicação dentro dele que imprimiu a mensagem acima.

***E agora?***
Talvez você esteja se perguntando:
- O que é exatamente uma imagem?
- Como eu coloco a minha aplicação dentro de um container?
- Posso criar meus próprios containers?
- E como gerencio tudo isso?

Calma! Essas perguntas são super válidas — e todas serão respondidas ao longo do curso. A jornada vai ser longa (e divertida!), mas no final você terá uma habilidade poderosa no seu leque de conhecimentos.
