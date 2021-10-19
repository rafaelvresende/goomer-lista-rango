import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { createServer } from "http";

import "@setup/repositoriesInjections.setup";
import { routes } from "@setup/routes.setup";

const app = express();

app.get("/", (request, response) => {
    return response.send("Bem vindo ao Goomer Lista Rango!");
});

app.use(express.json());
app.use(routes);

const http = createServer(app);
http.listen(3333, () => console.log("Server is running on port 3333"));
