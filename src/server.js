import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videosRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
// express application이 form의 value를 쓸수있게해줌
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

// local미들웨어가 session미들웨어보다 먼저 있으면
// session을 불러오지 못함
app.use(localsMiddleware);

// router
app.use("/", rootRouter);
app.use("/uploads", express.static("uploads"));
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
