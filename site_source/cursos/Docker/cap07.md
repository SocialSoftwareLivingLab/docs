---
id: cap-7
title: 07 - Automatizando o Docker (DOING)
sidebar_position: 7
---

# Capítulo 7 - Docker Compose 🐳🔧

Se você já cansou de rodar `docker run` mil vezes só pra subir um ambiente com vários containers... Parabéns! Está no lugar certo. Hoje vamos conhecer o glorioso **Docker Compose** — seu novo melhor amigo na orquestração de containers.

---

## 🧠 O que é Docker Compose?

Imagine que você tem um app com:

- um backend em Node.js,
- um banco de dados PostgreSQL,
- e um Redis pra cache.

Subir tudo isso na unha é possível... mas cansativo. Com o Docker Compose, você **define tudo em um arquivo `.yml`** e sobe com um simples:

```bash
docker compose up
```

:::tip Tradução:
É como escrever um roteiro pro Docker e deixar ele fazer o trabalho pesado.
:::

---

## 🚀 Começando com o Básico

### 1. Instalando o Docker Compose

:::note
Desde o Docker 1.27+, o Compose já vem embutido como `docker compose` (sem o hífen). Versões antigas usam `docker-compose`.
:::

Verifique com:

```bash title="Verificando o Compose"
docker compose version
```

Se não estiver instalado, siga [a documentação oficial](https://docs.docker.com/compose/install/).

---

### 2. Criando seu primeiro `docker-compose.yml`

```yaml title="docker-compose.yml"
version: "3.8"
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
```

Depois, rode:

```bash
docker compose up
```

Pronto! Acesse `http://localhost:8080` e veja o NGINX rodando. 😎

---

## 🛠 Estrutura de um Compose

Vamos decifrar o exemplo acima:

| Chave        | Significado                                               |
|--------------|------------------------------------------------------------|
| `version`    | Versão da sintaxe do Compose. Use `3.8` ou superior.       |
| `services`   | Define os containers que o Docker vai rodar.               |
| `image`      | A imagem que será usada.                                   |
| `ports`      | Mapeamento entre porta da máquina e do container.          |

---

## 🧩 Vários containers juntos: o poder do Compose

```yaml title="Exemplo: Node.js + MongoDB"
version: "3.8"
services:
  backend:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongo

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

:::tip
Use `depends_on` para garantir que o banco suba antes do backend. Mas cuidado: isso **não garante que o Mongo esteja pronto para conexão**! Use `wait-for-it` ou implemente um retry no seu app.
:::

---

## 📦 Volumes, Networks e Ambientes

### Volumes nomeados

```yaml title="docker-compose.yml"
volumes:
  db_data:
```

```yaml
services:
  db:
    volumes:
      - db_data:/var/lib/postgresql/data
```

---

### Networks customizadas

```yaml
networks:
  backend-net:
```

```yaml
services:
  backend:
    networks:
      - backend-net
```

---

### Variáveis de ambiente

`.env`:

```env title=".env"
MONGO_USER=admin
MONGO_PASS=123
```

```yaml
environment:
  - MONGO_INITDB_ROOT_USERNAME=${MONGO_USER}
  - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASS}
```

:::danger Segurança
Nunca coloque senhas diretamente no `docker-compose.yml`.
:::

---

## 🧠 Avançando: Comandos úteis

| Comando                        | O que faz                                  |
|-------------------------------|---------------------------------------------|
| `docker compose up`           | Sobe os containers                          |
| `docker compose up -d`        | Sobe em modo "detached" (em background)     |
| `docker compose down`         | Para e remove containers                    |
| `docker compose down -v`      | Remove também os volumes                    |
| `docker compose build`        | Faz build das imagens                      |
| `docker system prune -a`      | Limpa tudo (containers, volumes, imagens)  |

:::caution
`docker system prune -a` apaga **tudo** que não estiver em uso. Use com cuidado.
:::

---

## 🐙 Dicas Profundas (mas úteis)

:::caution
Evite usar `latest` como tag da imagem em produção. Isso pode mudar sem aviso e quebrar seu app.
:::

:::tip
Coloque seu `docker-compose.yml` e o `.env` na raiz do projeto. Isso facilita o deploy e manutenção.
:::

---

## ✅ Conclusão

O Docker Compose é aquele **parceiro confiável** que te ajuda a orquestrar ambientes complexos com elegância. Neste capítulo você aprendeu a:

- Criar ambientes multi-serviço;
- Usar volumes, redes e variáveis de ambiente;
- Utilizar comandos úteis do dia a dia;
- Aplicar boas práticas de versionamento e segurança.

---

## 🧾 Resumo do Capítulo

| Tema                        | O que você aprendeu                                 |
|----------------------------|------------------------------------------------------|
| **O que é Compose**         | Forma de orquestrar múltiplos containers com YAML.   |
| **Comandos principais**     | `up`, `down`, `build`, `logs`, `exec`, entre outros.|
| **Volumes e redes**         | Como persistir dados e isolar serviços.             |
| **Variáveis de ambiente**   | Separar configs sensíveis e reaproveitar valores.   |
| **Boas práticas**           | Evitar `latest`, usar `.env`, usar `depends_on` com cautela. |

---

## 📚 Referências

- 📖 [Documentação oficial do Docker Compose](https://docs.docker.com/compose/)
- 💡 [Awesome Compose (exemplos reais no GitHub)](https://github.com/docker/awesome-compose)

