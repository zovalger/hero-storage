import User from "@/models/User.model";
const mongoose = require("mongoose");

export const createUser = async (data) => {
    try {
        const newUser = new User(data)
        console.log(newUser);
        newUser.save()
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (data) => {
    try {
        const isValid = await User.findOne().where({ username: data.username, password: data.password });
        if (!isValid) {
            return 'Datos no validos';
        }
        return 'Datos validados';
    } catch (error) {
        console.log(error);
    }
};