import connectDb from "@/lib/db";
import { createFavoriteRelation, deleteFavoriteRelationByHero } from "@/controllers/FolderHeroRelation.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await createFavoriteRelation(req, res);

	if (req.method === "DELETE") return await deleteFavoriteRelationByHero(req, res);
}
