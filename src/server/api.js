import express from 'express';
import db from './db.js';

const port = process.env.PORT || 8080;
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

app.listen(port, () =>
    console.log(`listening on port ${port}`),
);