const { status } = require("express/lib/response");
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllMembers = (filterParams)=>{
    try {
      let members = DB.members;
      if(filterParams.mode){
        return DB.members.filter((member) => member.mode.toLowerCase().includes(filterParams.mode));
      }
        return members;
    } catch (error) {
        throw {status: 500, message:error}
    }
}

const getOneMember = (memberId) => {
    try {
        const member = DB.members.find((member) => member.id === memberId);
        if (!member) {
          throw{
            status:400,
            message: `${memberId}: Can't find member with this ID`
          }
        }
        return member;
    } catch (error) {
        throw{
            status: error?.status || 500,
            message: error?.message || error
        }
    }
};

const getOneMemberByEmail = (email) => {
  try {
      const member = DB.members.find((member) => member.email === email);
      if (!member) {
        throw{
          status:400,
          message: `${email}: Can't find member with this Email`
        }
      }
      return member;
  } catch (error) {
      throw{
          status: error?.status || 500,
          message: error?.message || error
      }
  }
};

const createNewMember = (newMember) =>{
    const isAlreadyAdded = DB.members.findIndex((member)=> member.email === newMember.email) > -1;
    if(isAlreadyAdded){
        throw{
            status:400,
            message: `${newMember.email}: Member with this email already exists`
        }
    }
    try {
        DB.members.push(newMember)
        saveToDatabase(DB);
        return newMember;
    } catch (error) {
        throw {
            status:500,
            message: error?.message || error 
        }
    }
}

const updateOneMember = (memberId, changes) => {
    try {
      const isAlreadyAdded = DB.members.findIndex((member) => member.email === changes.email) > -1;
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `${changes.email}: Member with this email already exists`
        };
      }
      const indexForUpdate = DB.members.findIndex((member) => member.id === memberId);
      if (indexForUpdate === -1) {
        throw {
          status: 400,
          message: `${memberId}: Can't find member with this ID`
        };
      }
      const updatedMember = {
        ...DB.members[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("pt-BR", { timeZone: "UTC" }),
      };
      DB.members[indexForUpdate] = updatedMember;
      saveToDatabase(DB);
      return updatedMember;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error 
        };
    }
};

const deleteOneMember = (memberId) => {
    try {
        const indexForDeletion = DB.members.findIndex((member) => member.id === memberId);
        if (indexForDeletion === -1) {
          throw{
            status:400,
            message: `${memberId}: Can't find member with this ID`
          }
        }
        DB.members.splice(indexForDeletion, 1);
        saveToDatabase(DB);        
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
};

module.exports = {
    getAllMembers,
    createNewMember,
    getOneMember,
    updateOneMember,
    deleteOneMember,
    getOneMemberByEmail
};