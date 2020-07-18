import express from 'express';
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get('/board/:boardId', async(req, res) => {
    return res.send(await db.getIssuesForBoard(req.params.boardId));
})

app.get('/users', async (req, res) => {
    return res.send(await db.getUsers());
})

app.get('/resolutionValues', async (req, res) => {
    return res.send(await db.getResolutionValues());
})

app.listen(3001, () =>
    console.log(`listening on port 3001`),
);