import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videosRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
// express application이 form의 value를 쓸수있게해줌

// app.use(express.text());
// comment부분에서 text를 그냥 보내면 req.body 에 내용이 담기지 않음
// 위에서 form의 value값을 사용할 수 있게 하는 것처럼 middleware를 추가
// 한개를 보낼때는 이런방식으로 할 수 있지만 객체를 보내게 될 경우 힘듬
// JSON.stringify()를 사용해야함. 이경우 JS object 형식으로 들어가지 않음
// 그래서 string을 받아서 json으로 바꿔주는 middleware를 써야함
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2000000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());
// local미들웨어가 session미들웨어보다 먼저 있으면
// session을 불러오지 못함
app.use(localsMiddleware);

// router
app.use("/", rootRouter);
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
