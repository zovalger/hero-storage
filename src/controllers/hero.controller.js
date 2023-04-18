import { getHeroBy_Id, getTenHeroes_service } from "@/service/hero.service";

export async function getTenHeroes_controller(req, res) {
	try {
		const heroes = await getTenHeroes_service();

		return res.json(heroes);
	} catch (error) {
		console.log(error);
	}
}

export async function getHeroById_controller(req, res) {
	try {
		const { id } = req.query;
		const hero = await getHeroBy_Id(id);

		if (!hero) return res.send("error");

		return res.json(hero);
	} catch (error) {
		console.log(error);
	}
}
