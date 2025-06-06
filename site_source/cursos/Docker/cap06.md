---
id: cap-6
title: 06 - Persistência de Dados
sidebar_position: 6
---

# Capítulo 6 - Volumes e Persistência de Dados

Containers são efêmeros por natureza. Isso significa que, quando você remove um container, todos os dados criados dentro dele também são apagados.

Mas... e se quisermos **manter os dados** mesmo após parar ou remover um container? É aí que entram os conceitos de **persistência de dados no Docker**.

Neste capítulo, você vai aprender tudo sobre como armazenar dados de forma persistente usando:

- ✅ **Volumes** (recomendado)
- 🗂️ **Bind Mounts** (mapeamento direto de pastas do seu computador)
- ⚡ **tmpfs** (armazenamento temporário na RAM)

---

## 🔥 Por que persistência é importante?

Imagine que você tem um container rodando um banco de dados. Se você parar ou remover o container, todos os dados desapareceriam.

Para evitar isso, usamos mecanismos de persistência que armazenam os dados fora do ciclo de vida dos containers.

---

# 📦 Volumes (O Método Recomendado)

## 🔍 O que é?

Volumes são gerenciados pelo próprio Docker. Eles são armazenados em uma área específica no host (`/var/lib/docker/volumes`) e são independentes do container.

Eles são:

- ✅ Persistentes
- ✅ Isolados da máquina host
- ✅ Portáveis
- ✅ Gerenciáveis via comandos Docker

## 🚀 Criando volumes

Para criar um volume:

```sh
docker volume create meu-volume
```

Verifique os volumes existentes:

```sh
docker volume ls
```

Veja detalhes de um volume específico:

```sh
docker volume inspect meu-volume
```

## 🏗️ Usando volumes em containers

```sh
docker run -d   -v meu-volume:/caminho/dentro/do/container   nginx
```

Por exemplo, para que o nginx sirva arquivos de um volume:

```sh
docker run -d   --name web   -p 8080:80   -v meu-volume:/usr/share/nginx/html   nginx
```

Acesse `http://localhost:8080` → Vai abrir uma página padrão do nginx.

## 🧪 Teste prático

1. Acesse o container:

```sh
docker exec -it web bash
```

2. Crie um arquivo:

```sh
echo "<h1>Site dentro de um volume!</h1>" > /usr/share/nginx/html/index.html
```

3. Acesse no navegador:  
→ `http://localhost:8080`

4. Pare e remova o container:

```sh
docker rm -f web
```

5. Crie outro container usando o mesmo volume:

```sh
docker run -d   -p 8080:80   -v meu-volume:/usr/share/nginx/html   nginx
```

✨ O site ainda está lá! Isso acontece porque os dados estão no volume, não no container.

## 🗑️ Removendo volumes

⚠️ Remover containers **não apaga volumes automaticamente!** Para excluir volumes:

```sh
docker volume rm meu-volume
```

Ou remover todos os volumes não utilizados:

```sh
docker volume prune
```

:::tip
**Volumes são a melhor opção para ambientes de produção!**  
Eles são seguros, portáveis, isolados e fáceis de fazer backup.
:::

---

# 🗂️ Bind Mounts

## 🔍 O que é?

Bind Mount conecta uma pasta do seu computador diretamente ao sistema de arquivos de um container.

Tudo que for alterado no host aparece no container e vice-versa.

## 🚀 Sintaxe

Forma curta:

```sh
docker run -d   -v /caminho/no/host:/caminho/no/container   nginx
```

Forma completa (mais legível):

```sh
docker run -d   --mount type=bind,source=/caminho/no/host,target=/caminho/no/container   nginx
```

## 🏗️ Exemplo prático

1. Crie uma pasta no seu computador:

```sh
mkdir meu-site
echo "<h1>Olá, Docker Bind Mount!</h1>" > meu-site/index.html
```

2. Rode o container:

```sh
docker run -d   --name web   -p 8080:80   -v $(pwd)/meu-site:/usr/share/nginx/html   nginx
```

3. Acesse `http://localhost:8080` → Seu site aparece!

4. Modifique o arquivo `index.html` e atualize o navegador → As mudanças aparecem instantaneamente.

:::info
**Bind Mounts são muito usados no desenvolvimento.**  
Permitem que você edite arquivos no seu computador e veja os resultados no container imediatamente.
:::

## ⚠️ Atenção

- **Menos seguro:** expõe pastas do host.
- **Menos portável:** depende do caminho absoluto do seu computador.
- **Ideal para desenvolvimento, não recomendado para produção.**

---

# ⚡ tmpfs — Armazenamento na RAM

## 🔍 O que é?

tmpfs monta um diretório **temporário na RAM do container**.

Quando o container é parado, os dados desaparecem. Nenhum dado é salvo no disco.

É útil quando:

- Os dados são extremamente sensíveis.
- Precisamos de armazenamento temporário.
- Queremos desempenho altíssimo (RAM é mais rápida que disco).

## 🚀 Sintaxe

Forma simples:

```sh
docker run -d   --tmpfs /caminho/dentro/do/container   nginx
```

Forma completa:

```sh
docker run -d   --mount type=tmpfs,destination=/caminho/dentro/do/container   nginx
```

## 🏗️ Exemplo prático

1. Rode um container nginx usando tmpfs:

```sh
docker run -d   --name web-tmpfs   -p 8080:80   --tmpfs /usr/share/nginx/html   nginx
```

2. Acesse o container:

```sh
docker exec -it web-tmpfs bash
```

3. Crie um arquivo:

```sh
echo "<h1>Olá, tmpfs!</h1>" > /usr/share/nginx/html/index.html
```

4. Acesse no navegador:  
→ `http://localhost:8080`

5. Remova e recrie o container. O arquivo desaparece, pois tudo estava na RAM.

:::warning
Se você reiniciar ou parar o container, **todos os dados são perdidos.** tmpfs vive apenas enquanto o container está em execução.
:::

---

# 🔥 Comparativo Geral

| Característica | **Volumes** | **Bind Mount** | **tmpfs** |
|----------------|--------------|----------------|------------|
| Localização    | Gerenciado pelo Docker | Diretório do host | RAM (memória) |
| Persistência   | ✅ | ✅ (no host) | ❌ |
| Desempenho     | Alto | Alto | **Altíssimo** |
| Segurança      | Alta | Média/Baixa (expõe host) | Alta (dados voláteis) |
| Portabilidade  | Alta | Baixa | Alta |
| Uso ideal      | Produção, banco de dados | Desenvolvimento, editar código | Cache, dados temporários, sessões |

---

# 🚀 Conclusão do Capítulo

Você agora domina os três principais mecanismos de persistência no Docker:

- 📦 **Volumes:** a melhor escolha para ambientes de produção. Portáveis, seguros e isolados.
- 🗂️ **Bind Mounts:** excelente para desenvolvimento, onde você quer que mudanças no seu computador reflitam no container em tempo real.
- ⚡ **tmpfs:** perfeito para dados temporários, sensíveis ou para cargas que exigem máxima performance.

Aqui foi todo o conteúdo básico de Docker, a partir de agora você está preparado para se virar por conta própria. O próximo capítulo será um extra de como automatizar processos, até lá! 🚀
