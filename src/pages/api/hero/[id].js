// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getHeroById_controller } from "@/controllers/hero.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getHeroById_controller(req, res);
}
