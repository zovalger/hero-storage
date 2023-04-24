import {
	newFolder_service,
	findByUserId_service,
	findById_service,
	updateFolderName_service,
	delFolder_service,
	getHeroesInFolder_service,
} from "@/service/folders.service";
import { verify } from "jsonwebtoken";

//Import cookie

export async function createNewFolder(req, res) {
	try {
		const { name } = req.body;

		const { authCookie } = req.cookies;
		const user = verify(authCookie, process.env.SECRET_WORD);
		const idUser = user._id;

		const folder = await newFolder_service(name, idUser);

		if (!folder)
			return res
				.status(500)
				.json({ error: { message: "no se creo la carpeta" } });

		if (folder.error) return res.status(500).json(folder);

		console.log(
			`carpeta creada con el nombre "${name}" por el usuario ${idUser} `
		);

		return res.status(200).json(folder);
	} catch (error) {
		console.log(error);
	}
}

export async function findFoldersByUser(req, res) {
	try {
		const { authCookie } = req.cookies;
		const user = verify(authCookie, process.env.SECRET_WORD);

		const folders = await findByUserId_service(user._id);
		console.log(
			`Se encontraron ${folders.length} carpetas para el usuario con ID ${user._id}`
		);
		return res.status(200).json(folders);
	} catch (error) {
		console.log(error);
	}
}

export async function findFolderById(req, res) {
	try {
		const { idFolder } = req.query;
		const folder = await findById_service(idFolder);

		if (!folder)
			console.log(`No se encontró ninguna carpeta con el id "${idFolder}"`);
		if (folder.error) console.log(folder);

		console.log(`Carpeta encontrada: ${folder}`);
	} catch (error) {
		console.log(error);
	}
}

export async function updateFolderName(req, res) {
	try {
		const { idFolder } = req.query;
		const { name } = req.body;

		const updatedFolder = await updateFolderName_service(idFolder, name);

		if (!updatedFolder)
			return res
				.status(404)
				.json({ error: { messaje: "carpeta no encontrada" } });

		if (updatedFolder.error) return res.status(500).json(updatedFolder);

		console.log(`Nombre de la carpeta actualizado a ${name}`);
		return res.status(200).json(updatedFolder);
	} catch (error) {
		console.log(error);
	}
}

export async function deleteFolder(req, res) {
	try {
		const { idFolder } = req.query;

		const folderDeleted = await delFolder_service(idFolder);

		if (!folderDeleted)
			return res
				.status(404)
				.json({ error: { message: "No se encontró ninguna carpeta" } });

		console.log(`carpeta eliminada con el ID ${idFolder}`);
		return res
			.status(200)
			.json({ success: true, message: "Carpeta eliminada" });
	} catch (error) {
		console.log(error);
	}
}

