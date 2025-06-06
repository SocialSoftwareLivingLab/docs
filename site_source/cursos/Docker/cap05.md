---
id: cap-5
title: 05 - Redes no Docker
sidebar_position: 5
---

# Capítulo 5 - Redes no Docker

No mundo dos containers, cada container é isolado do outro por padrão. Porém, muitas aplicações precisam se comunicar — por exemplo, uma API que acessa um banco de dados ou um servidor web que conversa com um serviço de autenticação.

É aqui que entra o **Docker Networking**, que permite que containers se comuniquem entre si e com o mundo externo.

## 🌐 Tipos de Redes no Docker

O Docker oferece diferentes drivers de rede, cada um para uma necessidade específica:

| Tipo       | Descrição                                                                                              |
| -----------| ------------------------------------------------------------------------------------------------------- |
| `bridge`   | Cria uma rede privada interna no host. Containers podem se comunicar usando IP ou nome (DNS interno).  |
| `host`     | O container compartilha a pilha de rede do host. É como se ele rodasse diretamente na sua máquina.     |
| `none`     | Desativa qualquer interface de rede do container. Totalmente isolado.                                  |
| `overlay`  | Permite que containers em hosts diferentes (em um cluster Docker Swarm) se comuniquem.                 |
| `macvlan`  | Dá ao container um IP na rede física, como se fosse outro dispositivo na sua rede local.               |

:::tip
Neste capítulo, vamos focar nos tipos `bridge`, `none` e `host`, que são os mais comuns no desenvolvimento local.
:::

## 🔍 Explorando Redes Existentes

Para listar as redes existentes no seu Docker, execute:

```sh
docker network ls
```

Por padrão, você verá pelo menos estas redes:

- `bridge` (rede padrão dos containers)
- `host`
- `none`

Se você não especificar nenhuma rede ao criar um container, ele será conectado à rede `bridge`.

---

## 🕸️ **Comunicação entre Containers — Modo Bridge**

Vamos testar como funciona a rede `bridge`.

### 🏗️ Cenário:

- Um container `nginx` servindo páginas.
- Um container `ubuntu` que faz uma requisição HTTP ao `nginx`.

### 🚀 Passo a passo:

1️⃣ **Suba um container com nginx:**

```sh
docker run -d --name webserver nginx
```

2️⃣ **Descubra o IP do nginx:**

```sh
docker inspect webserver
```

Procure por:

```json
"Networks": {
    "bridge": {
        "IPAddress": "172.17.0.X"
    }
}
```

⚠️ Esse é o IP do container dentro da rede `bridge`.

3️⃣ **Suba um container Ubuntu:**

```sh
docker run -it --name cliente ubuntu bash
```

4️⃣ **Instale o `curl`:**

```sh
apt update && apt install curl -y
```

5️⃣ **Faça uma requisição HTTP para o nginx:**

```sh
curl http://172.17.0.X
```

🎉 Você verá o conteúdo da página padrão do nginx, confirmando que os containers conseguem se comunicar na rede `bridge`.

:::tip
Essa comunicação funciona porque ambos os containers estão na mesma rede bridge padrão.
:::

---

## 🔒 **Isolando um Container — Modo None**

Imagine que você quer executar um container **totalmente isolado da rede**, seja por segurança, testes ou outros motivos.

### 🚫 Como fazer:

1️⃣ **Remova o nginx anterior:**

```sh
docker rm -f webserver
```

2️⃣ **Suba o nginx com rede `none`:**

```sh
docker run -d --name webserver --network none nginx
```

3️⃣ **Inspecione o container:**

```sh
docker inspect webserver
```

➡️ Veja que agora o campo `IPAddress` não existe e `Networks` mostra apenas:

```json
"Networks": {}
```

4️⃣ **Tente se conectar...**

No container Ubuntu, tente:

```sh
curl http://webserver
```

❌ **Erro!** O container `webserver` está isolado — sem IP, sem DNS, sem comunicação.

:::caution
Ao usar a rede `none`, o container não consegue nem mesmo acessar a internet.
:::

---

## 🏗️ **Criando uma Rede Bridge Personalizada — E Usando DNS!**

Trabalhar com IPs não é prático, pois eles podem mudar. Vamos criar uma rede onde os containers possam se comunicar pelo nome.

### 🚀 Criando a rede:

```sh
docker network create myNet
```

### 🔗 Conectando containers:

1️⃣ **Desconecte o nginx da rede `none`:**

```sh
docker network disconnect none webserver
```

2️⃣ **Conecte o nginx na rede `myNet`:**

```sh
docker network connect myNet webserver
```

3️⃣ **Conecte o Ubuntu na mesma rede:**

```sh
docker network connect myNet cliente
```

### 🔥 Testando:

No container Ubuntu:

```sh
curl http://webserver
```

🎉 **Sucesso!** Agora usamos o nome do container como hostname, graças ao DNS interno da rede personalizada.

:::tip
Isso facilita muito a comunicação! `webserver` é o nome do container e funciona como hostname dentro da rede `myNet`.
:::

---

## 🚀 **Modo Host — Sem Isolamento de Rede**

Quando usamos `--network host`, o container **compartilha a pilha de rede do seu computador**.

### ✔️ O que isso significa?

- Não há isolamento de portas.
- Se seu computador responde no `localhost:8080`, o container também estará lá — sem necessidade de `-p`.

### 🔥 Teste na prática:

1️⃣ **Limpe todos os containers:**

```sh
docker rm -f $(docker ps -qa)
```

2️⃣ **Rode sua aplicação (exemplo: `my-app`) diretamente na rede do host:**

```sh
docker run -d --network host my-app
```

3️⃣ **Acesse:**

Abra no navegador:

```
http://localhost:8080
```

Sem precisar mapear portas!

:::tip
Use `docker inspect` no container para comparar como a configuração de rede muda entre `bridge` e `host`.
:::

:::warning
O modo `host` não funciona no Windows e Mac da mesma forma que no Linux, devido às diferenças nas pilhas de rede desses sistemas.
:::

---

## 🎯 **Resumo do Capítulo**

- Containers se comunicam por redes Docker.
- O modo `bridge` é o padrão e permite comunicação via IP ou DNS se for uma rede personalizada.
- O modo `none` isola completamente o container.
- O modo `host` faz o container usar diretamente a rede do host.
- Criar redes personalizadas melhora a comunicação, permitindo usar nomes em vez de IPs.

---

## 🚀 **Próximo Passo**

Agora que dominamos redes no Docker, estamos prontos para entender **volumes e persistência de dados**, nosso próximo capítulo! 💾🔗
