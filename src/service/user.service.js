import UserModel from "@/models/User.model";
import { sign } from "jsonwebtoken";
import { newFolder_service } from "./folders.service";

const SECRET_WORD = process.env.SECRET_WORD;

export const createUser_service = async ({
	name,
	lastname,
	email,
	password,
}) => {
	try {
		const oldUser = await UserModel.findOne({ email });

		if (oldUser) return { error: { message: "Correo ya esta registrado" } };

		const newUser = await UserModel.create({
			name,
			lastname,
			email,
			password: sign(password, SECRET_WORD),
		});

		await newFolder_service("favorite", newUser._id);

		console.log(newUser);

		return newUser;
	} catch (error) {
		console.log(error);
	}
};

export const loginUser_service = async ({ email, password }) => {
	try {
		const user = await UserModel.findOne({
			email,
			password: sign(password, SECRET_WORD),
		});

		console.log(user);

		if (!user) return;

		return user;
	} catch (error) {
		console.log(error);
	}
};
