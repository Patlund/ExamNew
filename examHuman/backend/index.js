import express from 'express';
import routes from './routes.js';
import mySql from 'mysql2';
import bodyParser from 'body-parser';

const pool = mySql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '5065.Tess!',
    database: 'examHuman',
    connectionLimit: 10
}).promise();

const app = express();
app.use(bodyParser.json());


function setupRoutes() {
    app.use('/', routes)
}

setupRoutes();

app.listen(4000, () => console.log('Backend listening on port 4000'));

export default pool;
