import express from "express";
import { createServer } from "http";

const app = express();

app.get("/", (request, response) => {
    return response.send("Bem vindo ao Goomer Lista Rango!");
});

const http = createServer(app);
http.listen(3333, () => console.log("Server is running on port 3333"));
