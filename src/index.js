const app = require("./app");
require("./database");

app.listen(app.get("port"),()=>{
    console.log(`serve on port ${app.get("port")}`);
});