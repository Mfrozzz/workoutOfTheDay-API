const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function verifyToken(req,res,next){
    let token = req.headers['authorization']
    token = token.split(" ")[1];
    if(!token){
        return res.status(401).send({
            status: "FAILED",
            message: "Access denied"
        });
    }
    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send({
            status: "FAILED",
            message: "Something went wrong"
        })
    }
}

module.exports = verifyToken;