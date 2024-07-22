const Member = require("../database/Member")
const {v4:uuid} = require("uuid")

const getAllMembers = (filterParams) => {
    try {
        const allMembers = Member.getAllMembers(filterParams)
        return allMembers;
    } catch (error) {
        throw error
    }
};
  
const getOneMember = (memberId) => {
    try {
        const member = Member.getOneMember(memberId);
        return member;
    } catch (error) {
        throw error
    }
};

const getOneMemberByEmail = (email) => {
    try {
        const member = Member.getOneMemberByEmail(email);
        return member;
    } catch (error) {
        throw error
    }
};
  
const createNewMember = (newMember) => {
    const memberToInsert = {
        id:uuid(),
        ...newMember,
        createdAt: new Date().toLocaleString("pt-BR",{timeZone:"UTC"}),
        updatedAt:new Date().toLocaleString("pt-BR",{timeZone:"UTC"})
    }
    try{
        const createdMember = Member.createNewMember(memberToInsert)
        return createdMember;
    }catch(error){
        throw error;
    }
};
  
const updateOneMember = (memberId, changes) => {
    try {
        const updatedMember = Member.updateOneMember(memberId, changes);
        return updatedMember;
    } catch (error) {
        throw error
    }
};
  
const deleteOneMember = (memberId) => {
    try {
        Member.deleteOneMember(memberId);
    } catch (error) {
        throw error
    }
};
  
  module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember,
    getOneMemberByEmail
  };