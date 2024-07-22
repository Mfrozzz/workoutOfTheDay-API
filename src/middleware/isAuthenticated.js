const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function middleware(req, res){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw {
            status: "FAILED",
            message: "missing jwt token"
        }
    }
    const [type,token] = authHeader.split(' ');
    try {
        const decodeToken = jwt.verify(token, config.jwt.secret);
        req.user = {id:decodeToken}
        return NextFunction();
    } catch (error) {
        throw {
            status: "FAILED",
            message: "invalid jwt token"
        }
    }
}

module.export = middleware;