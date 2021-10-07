const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

//configuracion
app.set("port",process.env.PORT || 4000);

//midlwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use(require("./routes/user.routes"));


module.exports= app;
