const { status } = require("express/lib/response");
const memberService = require("../services/memberService");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');

const getAllMembers = (req,res)=>{
    const { mode } = req.query;
    try {
        const allMembers = memberService.getAllMembers({mode})
        res.send({status:"OK",data: allMembers})
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
}

const getOneMember = (req, res) => {
    const {
      params: { memberId },
    } = req;
    if (!memberId) {
      res.status(400).send({
        status: "BAD REQUEST",
        data: {
            error: "ID can't be empty"
        }
      });
    }
    try {
        const member = memberService.getOneMember(memberId);
        res.send({ status: "OK", data: member });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
};

const getOneMemberByEmail = (email) => {
    if(email){
        const user = memberService.getOneMemberByEmail(email);
        return user;
    } else {
        throw{
            status:400,
            message: `${email}: Can't find member with this Email`
          }
    }
    // const email = req;
    // if (!email) {
    //   res.status(400).send({
    //     status: "BAD REQUEST",
    //     data: {
    //         error: "Email can't be empty"
    //     }
    //   });
    // }
    // try {
    //     const member = memberService.getOneMemberByEmail(email);
    //     res.send({ status: "OK", data: member });
    // } catch (error) {
    //     res.status(error?.status || 500).send({
    //         status: "FAILED",
    //         data: {
    //             error: error?.message || error
    //         }
    //     })
    // }
};

const createNewMember = (req,res)=>{
    const { body } = req;
    if(!body.name || !body.gender || !body.dateOfBirth || !body.email || !body.password){
        res.status(400).send({
            status: "BAD REQUEST",
            data: {
                error: "Something is missing or empty request body"
            }
        })
        return;
    }
    var hashPassword = bcrypt.hashSync(body.password, 8);
    const newMember = {
        name: body.name,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        email: body.email,
        password: hashPassword
    }
    try {
        const createdMember = memberService.createNewMember(newMember);
        res.status(201).send({status:"OK", data: createdMember});
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
}

const signIn = (req,res) => {
    const { body } = req;
    if(!body.email || !body.password){
        res.status(400).send({
            status: "BAD REQUEST",
            data: {
                error: "Something is missing or empty request body"
            }
        })
        return;
    }
    const user = getOneMemberByEmail(body.email);
    if(!user){
        res.status(404).send({
            status: "User Not Find",
            data: {
                error: "Something is missing or empty request body FindByEmail"
            }
        })
        return;
    }
    var validPassword = bcrypt.compareSync(body.password, user.password);
    if(!validPassword){
        res.status(401).send({
            status: "Invalid Password",
            auth: false,
            token: null,
            data: {
                error: "Something is missing or empty request body FindByEmail"
            }
        })
        return;
    }
    try {
        var token = jwt.sign({}, config.jwt.secret, {
            subject: user.id,
            expiresIn: config.jwt.expiresIn
        });
        res.status(200).send({
            auth: true,
            token: token
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
}

const updateOneMember = (req, res) => {
    const {
      body,
      params: { memberId },
    } = req;
    if (!memberId) {
        res.status(400).send({
            status: "BAD REQUEST",
            data: {
                error: "ID can't be empty"
            }
          });
    }
    try {
        const updatedMember = memberService.updateOneMember(memberId, body);
        res.send({ status: "OK", data: updatedMember });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error
            }
        })
    }
};

const deleteOneMember = (req, res) => {
    const {
      params: { memberId },
    } = req;
    if (!memberId) {
        res.status(400).send({
            status: "BAD REQUEST",
            data: {
                error: "ID can't be empty"
            }
          });
    }
    try {        
        memberService.deleteOneMember(memberId);
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
    getAllMembers,
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember,
    signIn,
    getOneMemberByEmail
}