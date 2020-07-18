import mysql from 'mysql';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
const query = util.promisify(connection.query).bind(connection);
connection.connect();

async function getIssuesForBoard(boardId) {
    try {
        const data = await query(`SELECT * FROM Issues WHERE Board=${boardId}`)
        return { code: 200, data };
    } catch (err) {
        return { code: 400, error: err };
    }
}

async function getUsers() {
    try {
        const data = await query(`SELECT * FROM User`)
        return { code: 200, data };
    } catch (err) {
        return { code: 400, error: err };
    }
}

async function getResolutionValues() {
    try {
        const data = await query(`SELECT * FROM Resolution_Values`)
        return { code: 200, data };
    } catch (err) {
        return { code: 400, error: err };
    }
}


export default {
    getIssuesForBoard,
    getUsers,
    getResolutionValues
}