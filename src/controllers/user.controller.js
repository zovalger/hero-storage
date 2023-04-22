import { createUser, loginUser } from "@/service/user.service"

export async function registerUser_controller(req, res) {
    try {
        const { username, email, password } = req.body
        const data = { username, email, password }
        await createUser(data)
        console.log(`Nuevo registro [usuario: ${username}, correo: ${email}]`);
        return res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export async function loginUser_controller(req, res) {
    try {
        const { username, password } = req.body
        const data = { username, password }
        const result = await loginUser(data);
        return res.json(result)
    } catch (error) {
        console.log(error);
    }
}

