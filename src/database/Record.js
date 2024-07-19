const { status } = require("express/lib/response");
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

const getRecordForWorkoutMemberId = (workoutId, memberId) => {
  try {
    // const member = DB.records.filter((record) => record.memberId === memberId);
    // const workout = DB.records.filter((record) => record.workout === workoutId);
    const record = DB.records.filter((record) => ((record.workout === workoutId) && (record.memberId === memberId)));
    if(!record){
      throw{
        status: 400,
        message: `W = ${workoutId} and M = ${memberId}: Can't find workout with this ID or member`
      };
    }
    if(record == ""){
      throw{
        status: 400,
        message: `W = ${workoutId} or M = ${memberId}: Some info is wrong or missing`
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

module.exports = {
  getRecordForWorkout,
  getRecordForWorkoutMemberId
};