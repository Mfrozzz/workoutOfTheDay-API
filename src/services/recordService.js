const Record = require("../database/Record");

const getRecordForWorkout = (workoutId) => {
  try {
    const record = Record.getRecordForWorkout(workoutId);
    return record;
  } catch (error) {
    throw error;
  }
};

const getWorkoutForMemberId = (workoutId, memberId) => {
  try {
    const record = Record.getRecordForWorkoutMemberId(workoutId, memberId);
    return record;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRecordForWorkout,
  getWorkoutForMemberId
};