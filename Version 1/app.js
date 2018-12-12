const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  path = require("path"),
  rootDir = require("./util/path"),
  adminRoute = require("./routes/admin"),
  shopRoute = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.use("/admin", adminRoute);
app.use("/", shopRoute);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});
app.listen(3000);
