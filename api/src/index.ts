import Koa from 'koa'

const PORT = process.env.PORT ?? 3001

const app = new Koa()

app.use(async (ctx) => {
  ctx.res.statusCode = 200
});

app.listen(PORT)
