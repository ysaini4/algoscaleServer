const express = require("express");
const app = express();

require("./initial/db")();
require("./initial/startup")(app);
require("./initial/routes")(app);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
