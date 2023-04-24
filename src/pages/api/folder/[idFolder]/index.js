import connectDb from "@/lib/db";

import {
	updateFolderName,
	deleteFolder,
} from "@/controllers/folder.controller";
import { getHeroesInFolder } from "@/controllers/FolderHeroRelation.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getHeroesInFolder(req, res);

	if (req.method === "PUT") return await updateFolderName(req, res);

	if (req.method === "DELETE") return await deleteFolder(req, res);
}
