import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
// on은 계속 발생할 수 있음 여러번
db.once("open", handleOpen);
// once는 오로지 한번만 발생한다는 뜻
