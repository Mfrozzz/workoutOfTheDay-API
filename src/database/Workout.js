const { status } = require("express/lib/response");
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = (filterParams)=>{
    try {
      let workouts = DB.workouts;
      if(filterParams.mode){
        return DB.workouts.filter((workout) => workout.mode.toLowerCase().includes(filterParams.mode));
      }
        return workouts;
    } catch (error) {
        throw {status: 500, message:error}
    }
}

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if (!workout) {
          throw{
            status:400,
            message: `${workoutId}: Can't find workout with this ID`
          }
        }
        return workout;
    } catch (error) {
        throw{
            status: error?.status || 500,
            message: error?.message || error
        }
    }
};

const createNewWorkout = (newWorkout) =>{
    const isAlreadyAdded = DB.workouts.findIndex((workout)=> workout.name === newWorkout.name) > -1;
    if(isAlreadyAdded){
        throw{
            status:400,
            message: `${newWorkout.name}: Workout with this name already exists`
        }
    }
    try {
        DB.workouts.push(newWorkout)
        saveToDatabase(DB);
        return newWorkout;
    } catch (error) {
        throw {
            status:500,
            message: error?.message || error 
        }
    }
}

const updateOneWorkout = (workoutId, changes) => {
    try {
      const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `${changes.name}: Workout with this name already exists`
        };
      }
      const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);
      if (indexForUpdate === -1) {
        throw {
          status: 400,
          message: `${workoutId}: Can't find workout with this ID`
        };
      }
      const updatedWorkout = {
        ...DB.workouts[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("pt-BR", { timeZone: "UTC" }),
      };
      DB.workouts[indexForUpdate] = updatedWorkout;
      saveToDatabase(DB);
      return updatedWorkout;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error 
        };
    }
};

const deleteOneWorkout = (workoutId) => {
    try {
        const indexForDeletion = DB.workouts.findIndex((workout) => workout.id === workoutId);
        if (indexForDeletion === -1) {
          throw{
            status:400,
            message: `${workoutId}: Can't find workout with this ID`
          }
        }
        DB.workouts.splice(indexForDeletion, 1);
        saveToDatabase(DB);        
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
};

module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getOneWorkout,
    updateOneWorkout,
    deleteOneWorkout
};