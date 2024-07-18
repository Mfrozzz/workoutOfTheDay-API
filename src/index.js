const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const v1workoutRouter = require("./v1/routes/workoutRoutes");
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use("/api/v1/workouts", v1workoutRouter);

app.listen(PORT, () =>{
    console.log(`Visit localhost:${PORT}`);
});