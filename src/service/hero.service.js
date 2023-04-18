import HeroModel from "@/models/Hero.model";
import axios from "axios";

const createHeroDocument = async (hero) => {
	try {
		const oldHero = await HeroModel.findOne().where({ id: hero.id });

		if (oldHero) return oldHero;

		return await HeroModel.create(hero);
	} catch (error) {
		console.log(error);
	}
};

const saveHeroInDB = async (data) => {
	try {
		const { response, results } = data;

		if (response === "error") return console.log(`error por: ${data.error}`);

		if (results)
			return await Promise.all(await results.map(createHeroDocument));

		if (data.id) return await createHeroDocument(data);
	} catch (error) {
		console.log(error);
	}
};

export const getHeroBy_Id = async (id) => {
	try {
		console.log(`buscando heroe: ${id}`);

		let hero = await HeroModel.findOne().where({ id });

		if (!hero) {
			console.log(`no encontrado en db`);

			const res = await axios.get(`${process.env.SUPERHERO_URI}/${id}`);
			hero = await saveHeroInDB(res.data);
		}

		return hero;
	} catch (error) {
		console.log(error);
	}
};

export async function getTenHeroes_service() {
	try {
		const initSplit = Math.floor(Math.random() * 731);

		const heroes = [];

		for (let id = initSplit; id <= initSplit + 10; id++) {
			if (id > 731) continue;

			let hero = await getHeroBy_Id(id);

			heroes.push(hero);

			await new Promise((resolve) => setTimeout(resolve, 1100));
		}

		console.log(heroes);

		return heroes;
	} catch (error) {
		console.log(error);
	}
}
