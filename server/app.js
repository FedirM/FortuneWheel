const express = require('express');


const app = express();


require("./routes/score")(app);
require("./routes/segments")(app);
require("./routes/spin")(app);

app.listen(3000, () => console.log("Listening port 3000..."));