import connectDb from "@/lib/db";

import {
	createNewFolder,
	findFoldersByUser,
} from "@/controllers/folder.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await createNewFolder(req, res);

	if (req.method === "GET") return await findFoldersByUser(req, res);
}
