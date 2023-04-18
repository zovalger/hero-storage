// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "@/lib/db";

import { getTenHeroes_controller } from "@/controllers/hero.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getTenHeroes_controller(req, res);
}
