# Docker e Conteinerização
O Docker é uma ferramenta que permite a criação de containers, que são um isolamento de aplicação e dependências. Basicamente, busca 
isolar a aplicação de forma que ela rode de forma homogênea em diferentes máquinas, elimando problemas que podem ser originados por peculiaridades
de um ambiente específico

# Como isso funciona na prática?
Vamos criar uma aplicação expressjs isolada na prática, em uma pasta 'example-app', crie o arquivo 'server.js' para rodar o servidor
```js
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
Inicie o seu gerenciamento de dependências com o npm
```bash
npm init
```
Para o entrypoint da aplicação, especifique "server.js" ao invés de "index.js", e apenas aceite as demais configurações, ao final, você terá
um arquivo package.json, mais ou menos igual a:
```js
{
  "name": "example-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.21.2"
  }
}
```

Adicione o express ao projeto como dependência de desenvolvimento:
```js
npx add-dependencies --dev express
```

Para o próximo passo, será necessário a criação do Dockerfile, que é um arquivo que especifica quais 
são as configurações do container, como, por exemplo, o que precisa ser instalado, qual imagem utilizar, que arquivos copiar e quais comandos executar. Sem ele, seria necessário um trabalho manual a toda hora para iniciar o container. Crie o arquivo chamado 'Dockerfile' com o seguinte conteúdo:
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
CMD ["npm", "start"]
````

Crie um arquivo '.dockerignore' para evitar copiar arquivos desnecessários, e insira o seguinte conteúdo:
```.dockerignore
node_modules
npm-debug.log
```

Contrua a imagem com o seguinte comando:
```bash
docker build -t meu-app-express .
```

Agora você finalmente pode iniciar seu container usando o comando:
```bash
docker run -p 3000:3000 meu-app-express
```

Com isso, a aplicação pode ser acessada em 'http://localhost:3000'

# Monitorando a aplicação
Enquanto o container estiver rodando, podemos visualizar os seus logs com o comando:
```bash
docker logs <Container id>
```
Para saber o id do container use
```bash
docker ps
```

**ATENÇÃO**: como estamos usando a mesma porta (3000), temos que parar o container caso seja necessário subir outro. Por isso, caso alguma hora encontre o erro:

 "Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint"

veja o id dos containers que estão ativos com
```sh
docker ps
```
e pare os containers com o comando
```sh
docker stop <id-do-container>
```

## *Volumes*

- os containers rodam em um ambiente virtual, o que significa que todos os dados criados são perdidos quando o container para, isto é, o container não possui estado.
- contudo, seria muito interessante, termos logs gravados em diretório local para facilitar a visualização e acompanhamento dos nossos containers,
pois a visualização dos logs por id apenas fica disponível enquanto o container estiver executando. 
- **Para isso existe o conceito de Volume**. Um volume é uma conexão entre um arquivo dentro do container e uma arquivo na máquina rost, que associa tudo que é gravado nesse arquivo, também é gravado localmente

Faça uma pequena modificação no Dockerfile
- altere a linha:
```sh
CMD ["node", "server.js"]
```
- para
```sh
CMD ["sh", "-c", "node server.js > logs/log.txt 2>&1"]
```
Isso fará o servidor escrever os outputs (console.log) e erros em um arquivo log.txt, dentro da pasta logs

- pare a execução do container com "ctrl + c"
- agora recontrua a imagem, já que fizemos alterações nela
```sh
docker build -t meu-app-express .
```

- inicie um novo container, mas dessa vez, crie um volume, ligando o arquivo de log no ambiente virtual, em um arquivo de log na máquina host.
- Observação: agora iremos criar o volume pela linha de comando, mas futuramente esse processo será automatizado com um script de docker-compose
- execute o comando:
```sh
docker run -d -p 3000:3000 -v $(pwd)/logs:/app/logs meu-app-express
```
Explicação Parte por Parte desse comando:

1️⃣ docker run

Comando para criar e rodar um novo container a partir de uma imagem Docker.

2️⃣ -d (detached mode)

Roda o container em modo desacoplado (em segundo plano).
Sem isso, o terminal ficaria preso ao container, exibindo os logs diretamente.

3️⃣ -p 3000:3000 (port mapping)

Mapeia a porta do container para o host, permitindo acesso externo.
3000:3000 significa:
A porta 3000 do host (localhost:3000) será redirecionada para a porta 3000 do container.
Se o app no container estiver escutando na porta 3000, ele ficará acessível no host.

4️⃣ -v $(pwd)/logs:/app/logs (volume binding)

Monta um volume do host dentro do container para persistência de dados.
$(pwd)/logs → Refere-se à pasta logs/ dentro do diretório atual do host.
/app/logs → Onde essa pasta será montada dentro do container.
Isso significa que qualquer arquivo criado em /app/logs dentro do container será salvo na pasta logs/ do host.
Permite persistência de logs, mesmo se o container for removido.

5️⃣ meu-app-express

Nome da imagem Docker que será usada para criar o container.
Se essa imagem não existir localmente, o Docker tentará baixá-la do Docker Hub ou do seu registro privado.

Agora podemos verificar, que em nossa máquina, o arquivo "logs/log.txt" contém os outputs do nosso servidor

```sh
cat logs/log.txt
```

# Automatização do processo
Existe uma ferramenta chamada docker-compose que nos auxilia a automatizar o processo de criação e gerenciamento de containers
- crie um arquivo "docker-compose.yml" com o seguinte conteúdo:
```bash
version: "3.8"
services:
  app: # nome para o serviço
    build: . # especifíca o local do Dockerfile
    container_name: meu-app # nome dado ao container
    ports:
      - "3000:3000" # mapeamento de portas, nesse caso mapeia a 3000 local para a 3000 do ambiente virtual
    volumes:
      - ./logs:/app/logs # mapeamento de volume como visto anteriormente, mas agora de forma automatizada
    restart: always  # Reinicia automaticamente em caso de falha
```
Agora podemos facilmente manipular o container com os seguintes comandos:
  - iniciar o container: docker-compose up -d
  - reiniciar o container: docker-compose restart
  - parar o container: docker-compose down
  - parar e remover tudo (containers, imagens, volumes): docker-compose down --volumes 
- experimente com "docker-compose up -d" para ver o container em funcionamento

Para esse caso temos apenas um container, então é apenas um exercício didático, mas o docker-compose é usado no mundo real quando temos que gerenciar mais de um container, nesse caso ele é extremamente útil

# Manipulando mais de um container
Para o próximo passo, iremos utilizar o docker-compose para gerenciar mais de um container, agora iremos interagir com um banco de dados

Instale as dependências necessárias para interagir com o banco
```sh
npx add-dependencies mongoose express cors body-parser
```
Agora o nosso server irá conter um simples CRUD com MongoDB
```javascript
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/meubanco";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔥 Conectado ao MongoDB!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Definir um modelo (Schema) do MongoDB
const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model("Item", ItemSchema);

// 📌 Criar um novo item (Create)
app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 Listar todos os itens (Read)
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Buscar um item por ID (Read)
app.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item não encontrado" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Atualizar um item (Update)
app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ error: "Item não encontrado" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 Deletar um item (Delete)
app.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item não encontrado" });
    }
    res.json({ message: "Item deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
```

Modifique o seu 'docker-compose.yml' para conter a criação de um container a partir da imagem do mongodb:
```docker-compose.yml
version: "3.8"

services:
  app:
    build: .
    container_name: meu-app
    ports:
      - "3000:3000"
    volumes:
      - ./logs:/app/logs
    environment:
      - MONGO_URI=mongodb://mongo:27017/meubanco
    depends_on:
      - mongo
    restart: always

  mongo:
    image: mongo:6
    container_name: meu-mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=meubanco
    restart: always

volumes:
  mongo-data:
```

Tudo pronto, rode a aplicação:
```
docker-compose up -d
```
Verifique se os dois containers estão disponíveis:
```
docker ps
```
- você deve ver ao menos dois containers, um com o nome 'meu-app' e outro com o nome 'meu-mongo'

Por fim, vamos testar o CRUD, agora temos uma aplicação completa:

🟢 1. Criar um novo item (POST /items)

🧪 Comando:
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Caderno", "description": "Caderno de anotações"}'
```
📤 Resposta esperada:
```json
{
  "_id": "605c72f8e813f5001cfd31d5",
  "name": "Caderno",
  "description": "Caderno de anotações",
  "__v": 0
}
```
🔵 2. Listar todos os itens (GET /items)

🧪 Comando:
```bash
curl http://localhost:3000/items
```
📤 Resposta esperada:
```json
[
  {
    "_id": "605c72f8e813f5001cfd31d5",
    "name": "Caderno",
    "description": "Caderno de anotações",
    "__v": 0
  },
  {
    "_id": "605c7314e813f5001cfd31d6",
    "name": "Caneta",
    "description": "Caneta azul",
    "__v": 0
  }
]
```
🟡 3. Buscar um item por ID (GET /items/:id)

🧪 Comando:
```bash
curl http://localhost:3000/items/605c72f8e813f5001cfd31d5
📤 Resposta esperada:
```json
{
  "_id": "605c72f8e813f5001cfd31d5",
  "name": "Caderno",
  "description": "Caderno de anotações",
  "__v": 0
}
```
Se o ID não existir:
```json
{
  "error": "Item não encontrado"
}
```
🟠 4. Atualizar um item (PUT /items/:id)

🧪 Comando:
```bash
curl -X PUT http://localhost:3000/items/605c72f8e813f5001cfd31d5 \
  -H "Content-Type: application/json" \
  -d '{"name": "Caderno Atualizado", "description": "Com capa dura"}'
```
📤 Resposta esperada:
```json
{
  "_id": "605c72f8e813f5001cfd31d5",
  "name": "Caderno Atualizado",
  "description": "Com capa dura",
  "__v": 0
}
```
Se o ID não existir:
```json
{
  "error": "Item não encontrado"
}
```
🔴 5. Deletar um item (DELETE /items/:id)

🧪 Comando:
```bash
curl -X DELETE http://localhost:3000/items/605c72f8e813f5001cfd31d5
```
📤 Resposta esperada:
```json
{
  "message": "Item deletado com sucesso!"
}
```
Se o ID não existir:
```json
{
  "error": "Item não encontrado"
}
```