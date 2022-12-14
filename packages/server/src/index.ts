import path from 'path';
import * as dotenv from 'dotenv';
import Koa from 'koa';
import parser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import KoaRouter from 'koa-router';
import koaStatic from 'koa-static';

dotenv.config({
  path: path.join(__dirname, '../../../', '.env'),
});

const app: Koa = new Koa();

app.use(json());
app.use(parser());
app.use(logger());

app.use(koaStatic(path.join(__dirname, '../static')));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`seccess start server`);
  console.log(`local: http://127.0.0.1:${process.env.SERVER_PORT}`);
});
