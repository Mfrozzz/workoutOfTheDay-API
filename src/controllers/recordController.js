const { status } = require("express/lib/response");
const recordService = require("../services/recordService")

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

module.exports = {
    getRecordForWorkout,
    getWorkoutMemberId
}