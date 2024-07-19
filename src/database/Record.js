const { status } = require("express/lib/response");
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllRecords = (filterParams)=>{
  try {
    let records = DB.records;
    if(filterParams.mode){
      return DB.records.filter((record) => record.mode.toLowerCase().includes(filterParams.mode));
    }
      return records;
  } catch (error) {
      throw {status: 500, message:error}
  }
}

const getOneRecord = (recordId) => {
  try {
      const record = DB.records.find((record) => record.id === recordId);
      if (!record) {
        throw{
          status:400,
          message: `${recordId}: Can't find record with this ID`
        }
      }
      return record;
  } catch (error) {
      throw{
          status: error?.status || 500,
          message: error?.message || error
      }
  }
};

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

const createNewRecord = (newRecord) =>{
  const isAlreadyAdded = DB.records.findIndex((record)=> record.id === newRecord.id) > -1;
  if(isAlreadyAdded){
      throw{
          status:400,
          message: `${newRecord.id}: record with this id already exists`
      }
  }
  try {
      DB.records.push(newRecord)
      saveToDatabase(DB);
      return newRecord;
  } catch (error) {
      throw {
          status:500,
          message: error?.message || error 
      }
  }
}

const updateOneRecord = (recordId, changes) => {
  try {
    const isAlreadyAdded = DB.records.findIndex((record) => record.id === changes.id) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `${changes.id}: Record with this id already exists`
      };
    }
    const indexForUpdate = DB.records.findIndex((record) => record.id === recordId);
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `${recordId}: Can't find record with this ID`
      };
    }
    const updatedRecord = {
      ...DB.records[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("pt-BR", { timeZone: "UTC" }),
    };
    DB.records[indexForUpdate] = updatedRecord;
    saveToDatabase(DB);
    return updatedRecord;
  } catch (error) {
      throw {
          status: error?.status || 500,
          message: error?.message || error 
      };
  }
};

const deleteOneRecord = (recordId) => {
  try {
      const indexForDeletion = DB.records.findIndex((record) => record.id === recordId);
      if (indexForDeletion === -1) {
        throw{
          status:400,
          message: `${recordId}: Can't find record with this ID`
        }
      }
      DB.records.splice(indexForDeletion, 1);
      saveToDatabase(DB);        
  } catch (error) {
      throw {
          status: error?.status || 500,
          message: error?.message || error
      }
  }
};

module.exports = {
  getAllRecords,
  getOneRecord,
  getRecordForWorkout,
  getRecordForWorkoutMemberId,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord
};