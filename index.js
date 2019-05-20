const server = require("./server.js");
const env = require("dotenv");

env.config();

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n***server listening on port ${port}`);
});
