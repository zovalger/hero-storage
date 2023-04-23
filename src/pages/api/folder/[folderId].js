
import connectDb from "@/lib/db";

import { findFolderById, deleteFolder } from "@/controllers/folder.controller"



export default async function handler(req, res) {
	await connectDb();

    if (req.method === "GET") return await findFolderById(req, res);
    
    if (req.method === "DELETE") return await deleteFolder(req, res);
}
