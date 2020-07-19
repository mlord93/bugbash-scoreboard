import mysql from 'mysql';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
const query = util.promisify(connection.query).bind(connection);
connection.connect();

async function getIssuesForBoard(boardId) {
    try {
        const usersOnBoardResponse = await getUsersForBoard(boardId);
        const usersOnBoard = usersOnBoardResponse.data;
        await Promise.all(usersOnBoard.map(async (user) => {
            user.issues = await query(`SELECT * FROM Issues WHERE Board=${boardId} AND user=${user.id}`);
        }));
        return { code: 200, data: usersOnBoard };
    } catch (err) {
        console.log(err);
        return { code: 400, error: "Error fetching data" };
    }
}

async function getUsersForBoard(boardId) {
    try {
        const data = await query(`SELECT User.* FROM Issues INNER JOIN User ON Issues.user = User.id WHERE board = ${boardId} GROUP BY User.id`)
        return { code: 200, data };
    } catch (err) {
        console.log(err);
        return { code: 400, error: "Error fetching data" };
    }
}

async function getUsers(users) {
    try {
        let queryString;
        if (users && users.length) {
            queryString = `SELECT * FROM User WHERE id IN (${users.split(', ')})`
        } else {
            queryString = `SELECT * FROM User`
        }
        const data = await query(queryString)
        return { code: 200, data };
    } catch (err) {
        console.log(err);
        return { code: 400, error: "Error fetching data" };
    }
}

async function getResolutionValues() {
    try {
        const data = await query(`SELECT * FROM Resolution_Values`)
        return { code: 200, data };
    } catch (err) {
        console.log(err);
        return { code: 400, error: "Error fetching data" };
    }
}


export default {
    getIssuesForBoard,
    getUsersForBoard,
    getUsers,
    getResolutionValues
}