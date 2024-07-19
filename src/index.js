const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const v1workoutRouter = require("./v1/routes/workoutRoutes");
const bodyParser = require("body-parser")
const apicache = require("apicache");
const cache = apicache.middleware;

app.use(bodyParser.json())
// app.use(cache("2 minutes"));
app.use("/api/v1/workouts", v1workoutRouter);

app.listen(PORT, () =>{
    console.log(`Visit localhost:${PORT}`);
});