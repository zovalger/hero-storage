import connectDb from "@/lib/db";
import { createNewRelation, deleteRelationByFolderAndHero } from "@/controllers/FolderHeroRelation.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await createNewRelation(req, res);

	if (req.method === "DELETE") return await deleteRelationByFolderAndHero(req, res);
}
