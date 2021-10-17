import express from "express";
import { createServer } from "http";
import promisePool from "./utils/databaseConnection";

const app = express();

app.get("/", (request, response) => {
    return response.send("Bem vindo ao Goomer Lista Rango!");
});

app.get("/restaurants", async (request, response) => {
    let restaurants;
    try {
        const [rows, fields] = await promisePool.execute("SELECT * FROM restaurant");
        restaurants = rows;
    } catch(error) {
        console.log(error);
    }
    return response.json({
        restaurants,
    });
});

const http = createServer(app);
http.listen(3333, () => console.log("Server is running on port 3333"));
