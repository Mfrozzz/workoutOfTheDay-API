const { status } = require("express/lib/response");
const recordService = require("../services/recordService")

const getAllRecords = (req,res)=>{
    const { mode } = req.query;
    try {
        const allRecords = recordService.getAllRecords({mode})
        res.send({status:"OK",data: allRecords})
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
}

const getOneRecord = (req, res) => {
    const {
      params: { recordId },
    } = req;
    if (!recordId) {
      res.status(400).send({
        status: "BAD REQUEST",
        data: {
            error: "ID can't be empty"
        }
      });
    }
    try {
        const record = recordService.getOneRecord(recordId);
        res.send({ status: "OK", data: record });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
};

const getRecordForWorkout = (req,res) =>{
    const {
        params: { workoutId },
    } = req;
    if (!workoutId) {
      res.status(400).send({
        status: "BAD REQUEST",
        data: {
            error: "ID can't be empty"
        }
      });
    }
    try {
        const workout = recordService.getRecordForWorkout(workoutId);
        res.send({
            status: "OK",
            data: workout
        })
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
}

const getWorkoutMemberId = (req,res) => {
    const {
        params: {
            workoutId,
            memberId
        }
    } = req;
    if(!workoutId && !memberId){
        res.status(400).send({
            status: "BAD REQUEST",
            data: {
                error: "IDs can't be empty"
            }
        });
    }
    try {
        const record = recordService.getWorkoutForMemberId(workoutId,memberId);
        res.send({
            status: "OK",
            data: record
        })
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
}

const createNewRecord = (req,res)=>{
    const { body } = req;
    if(!body.workout || !body.record || !body.member){
        res.status(400).send({
            status: "BAD REQUEST",
            data: {
                error: "Something is missing or empty request body"
            }
        })
        return;
    }
    const newRecord = {
        workout: body.workout,
        record: body.record,
        member: body.member
    }
    try {
        const createdRecord = recordService.createNewRecord(newRecord)
        res.status(201).send({status:"OK", data: createdRecord});
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
}

const updateOneRecord = (req, res) => {
    const {
      body,
      params: { recordId },
    } = req;
    if (!recordId) {
        res.status(400).send({
            status: "BAD REQUEST",
            data: {
                error: "ID can't be empty"
            }
          });
    }
    try {
        const updatedRecord = recordService.updateOneRecord(recordId, body);
        res.send({ status: "OK", data: updatedRecord });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
};

const deleteOneRecord = (req, res) => {
    const {
      params: { recordId },
    } = req;
    if (!recordId) {
        res.status(400).send({
            status: "BAD REQUEST",
            data: {
                error: "ID can't be empty"
            }
          });
    }
    try {        
        recordService.deleteOneRecord(recordId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
};

module.exports = {
    getAllRecords,
    getOneRecord,
    getRecordForWorkout,
    getWorkoutMemberId,
    createNewRecord,
    updateOneRecord,
    deleteOneRecord
}