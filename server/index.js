import express from 'express';
import path from 'path';
import db from './db.js';

const port = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(path.dirname(''), './client/build')));

app.get('/api/board/:boardId', async(req, res) => {
    res.set('Content-Type', 'application/json');
    return res.send(await db.getIssuesForBoard(req.params.boardId));
})

app.get('/api/users', async (req, res) => {
    res.set('Content-Type', 'application/json');
    return res.send(await db.getUsers());
})

app.get('/api/resolutionValues', async (req, res) => {
    res.set('Content-Type', 'application/json');
    return res.send(await db.getResolutionValues());
})

app.get('*', function (req, res) {
    res.sendFile(path.resolve(path.dirname(''), './client/build', 'index.html'));
});

app.listen(port, () =>
    console.log(`listening on port ${port}`),
);