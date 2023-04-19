import {
	getHeroBy_Id,
	getHeroesBy_Name_service,
	getTenHeroes_service,
} from "@/service/hero.service";

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

		if (!hero) return res.status(404).send("error");

		return res.json(hero);
	} catch (error) {
		console.log(error);
	}
}

export async function getHeroByName_controller(req, res) {
	try {
		const { name } = req.query;

		console.log(name);

		const hero = await getHeroesBy_Name_service(name);

		if (!hero) return res.status(500).send("error");
		if (hero.length <= 0) return res.status(404).send("error");

		return res.json(hero);
	} catch (error) {
		console.log(error);
	}
}
