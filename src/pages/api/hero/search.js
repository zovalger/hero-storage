import { getHeroByName_controller, getHeroByQuery_controller } from "@/controllers/hero.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	// if (req.method === "GET") return await getHeroByName_controller(req, res);
	if (req.method === "GET") return await getHeroByQuery_controller(req, res);

	// buscar en superhero api

	// guardar en DB local

	// hacer misma consulta en DB local

	// enviar datos
}
