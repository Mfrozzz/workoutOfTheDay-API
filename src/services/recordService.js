const Record = require("../database/Record");
const {v4:uuid} = require("uuid")

const getAllRecords = (filterParams) => {
    try {
        const allRecords = Record.getAllRecords(filterParams)
        return allRecords;
    } catch (error) {
        throw error
    }
};
  
const getOneRecord = (recordId) => {
    try {
        const record = Record.getOneRecord(recordId);
        return record;
    } catch (error) {
        throw error
    }
};

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
  
const createNewRecord = (newRecord) => {
    const recordToInsert = {
        ...newRecord,
        id:uuid(),
        createdAt: new Date().toLocaleString("pt-BR",{timeZone:"UTC"}),
        updatedAt:new Date().toLocaleString("pt-BR",{timeZone:"UTC"})
    }
    try{
        const createdRecord = Record.createNewRecord(recordToInsert)
        return createdRecord;
    }catch(error){
        throw error;
    }
};
  
const updateOneRecord = (recordId, changes) => {
    try {
        const updatedRecord = Record.updateOneRecord(recordId, changes);
        return updatedRecord;
    } catch (error) {
        throw error
    }
};
  
const deleteOneRecord = (recordId) => {
    try {
        Record.deleteOneRecord(recordId);
    } catch (error) {
        throw error
    }
};

module.exports = {
  getAllRecords,
  getOneRecord,
  getRecordForWorkout,
  getWorkoutForMemberId,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord
};