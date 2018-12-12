const fs = require("fs");

const reqHandler = (req, res) => {
  if (req.url === "/") {
    res.write("<html>");
    res.write("<body>");
    res.write(
      "<form action='/message' method='POST'><input type='text' name='message' /><button type='Submit'>Send</button></form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
      console.log(chunk);
    });
    return req.on("end", () => {
      const parsedObj = Buffer.concat(body).toString();
      console.log(parsedObj);

      const message = parsedObj.split("=")[1];
      console.log(message);

      fs.writeFile("msg.txt", message, err => {
        if (err) throw err;
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<body>");
  res.write("<h1> This is Home Page</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
};

module.exports = reqHandler;
