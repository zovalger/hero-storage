import {
	newFolder_service,
	findByUserId_service,
	findById_service,
	delFolder_service,
} from "@/service/folders.service";

//Import cookie

export async function createNewFolder(req, res) {
	try {
		const { name } = req.body;

		const { authCookie } = req.cookies;
		const user = verify(authCookie, process.env.SECRET_WORD);
		const idUser = user._id;

		const folder = await newFolder_service(name, idUser);

		if (!folder) console.log("no se creo la carpeta");
		if (folder.error) console.log(folder.error);

		console.log(
			`carpeta creada con el nombre ${username} por el usuario ${idUser} `
		);
	} catch (error) {
		console.log(error);
	}
}

export async function findFoldersByUser(req, res) {
	try {
		const { authCookie } = req.cookies;
		const user = verify(authCookie, process.env.SECRET_WORD);

		const folders = await findByUserId_service(user._id);

		return console.log(
			`Se encontraron ${folders.length} carpetas para el usuario con ID ${user._id}`
		);
	} catch (error) {
		console.log(error);
	}
}

export async function findFolderById(req, res) {
	try {
		const { folderId } = req.query;
		const folder = await findById_service(folderId);

		if (!folder)
			console.log(`No se encontró ninguna carpeta con el id "${folderId}"`);
		if (folder.error) console.log(folder.error);

		console.log(`Carpeta encontrada: ${folder}`);
	} catch (error) {
		console.log(error);
	}
}

export async function deleteFolder(req, res) {
	try {
		const { folderId } = req.query;
		const folderDeleted = await delFolder_service(folderId);

		if (!folderDeleted)
			console.log(`No se encontró ninguna carpeta con el ID ${folderId}`);

		console.log(`carpeta eliminada con el ID ${folderId}`);
	} catch (error) {
		console.log(error);
	}
}
