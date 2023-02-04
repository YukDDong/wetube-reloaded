import exrpess from "express";

const PORT = 4000;

const app = exrpess();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if(url === "/protected"){
    return res.send("<h1>Not Allowed</h1>");
  };
  next();
};

const handleHome = (req, res) => {
  return res.send("<h1>I still love you.</h1>")
};

const handleLogin = (req, res) => {
  return res.send("Login here.")
}

const handleProtected = (req, res) => {
  return res.send("Protected!")
}

app.use(logger); 
// app.use 는 모든 route에서 middleware를 사용하게 해준다.
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/protected", handleProtected)

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
