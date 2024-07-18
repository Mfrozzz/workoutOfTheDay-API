const DB = require("./db.json");

const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId);
    if (!record) {
      throw {
        status: 400,
        message: `${workoutId}: Can't find workout with this ID`
      };
    }
    return record;
  } catch (error) {
    throw {
        status: error?.status || 500,
        message: error?.message || error 
    };
  }
};

module.exports = { getRecordForWorkout };