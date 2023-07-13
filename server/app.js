const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;


const app = express();


app.use("/public", express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
