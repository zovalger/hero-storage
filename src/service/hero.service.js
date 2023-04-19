import HeroModel from "@/models/Hero.model";
import {
	getById_SuperHeroApi,
	getByName_SuperHeroApi,
} from "./superHeroApi.service";

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

		if (data instanceof Array) {
			console.log("guardado por array");

			return JSON.parse(
				JSON.stringify(await Promise.all(await data.map(createHeroDocument)))
			);
		}

		if (response === "error") return console.log(`error por: ${data.error}`);

		if (results)
			return JSON.parse(
				JSON.stringify(await Promise.all(await results.map(createHeroDocument)))
			);

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

			const heroData = await getById_SuperHeroApi(id);

			hero = await saveHeroInDB(heroData);
		}

		return hero;
	} catch (error) {
		console.log(error);
	}
};

export const getHeroesBy_Name_service = async (nameHero) => {
	try {
		const heroData = await getByName_SuperHeroApi(nameHero);

		await saveHeroInDB(heroData);
	} catch (error) {
		console.log("error de conexion con la api");
		console.log(error);
	}

	try {
		const heroes = await HeroModel.find({ name: new RegExp(nameHero, "i") });
		return heroes;
	} catch (error) {
		console.log("error en la consulta a la DB");
		console.log(error);
	}
};

export async function getTenHeroes_service() {
	try {
		const ids = [];
		const heroFromCloud = [];

		while (ids.length < 10) {
			const id = Math.floor(Math.random() * 731);

			if (!ids.find((idL) => id === idL)) ids.push(id);
		}

		const heroesInLocal = await HeroModel.find().where("id").in(ids).lean();

		const noIdsInLocal = ids.filter((id) => {
			let isIn = true;

			for (const hero of heroesInLocal) {
				if (id == hero.id) isIn = false;
			}

			return isIn;
		});

		await Promise.all(
			await noIdsInLocal.map(async (id) => {
				const heroData = await getById_SuperHeroApi(id);

				console.log(id);

				heroFromCloud.push(heroData);

				await new Promise((resolve) => setTimeout(resolve, 1050));
			})
		);

		const newSaveHeroes =
			heroFromCloud.length > 0 ? await saveHeroInDB(heroFromCloud) : [];

		return [...heroesInLocal, ...newSaveHeroes];
	} catch (error) {
		console.log(error);
	}
}
