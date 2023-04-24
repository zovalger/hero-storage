import HeroModel from "@/models/Hero.model";
import {
	getById_SuperHeroApi,
	getByName_SuperHeroApi,
} from "./superHeroApi.service";

const createHeroDocument = async (hero = null) => {
	if (!hero) return;

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

		const hero = await HeroModel.findOne().where({ _id: id });

		if (!hero) return;

		// if (!hero) {
		// 	console.log(`no encontrado en db`);

		// 	const heroData = await getById_SuperHeroApi(id);

		// 	hero = await saveHeroInDB(heroData);
		// }

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

export const getHeroesBy_Query_service = async (query, or = false) => {
	const {
		name: nameReq,
		publisher: publisherReq,
		alignment: alignmentReq,
		gender: genderReq,
		firstAppearance: firstAppearanceReq,
	} = query;

	if (
		!nameReq &&
		!publisherReq &&
		!alignmentReq &&
		!genderReq &&
		!firstAppearanceReq
	)
		return getTenHeroes_service();

	let name, publisher, alignment, gender, firstAppearance;

	if (nameReq) name = new RegExp(nameReq, "i");
	if (publisherReq) publisher = new RegExp(publisherReq, "i");
	if (alignmentReq) alignment = new RegExp(alignmentReq, "i");
	if (genderReq) gender = new RegExp(genderReq, "i");
	if (firstAppearanceReq) firstAppearance = new RegExp(firstAppearanceReq, "i");

	try {
		if (nameReq) {
			const heroData = await getByName_SuperHeroApi(nameReq);
			await saveHeroInDB(heroData);
		}
	} catch (error) {
		console.log("error de conexion con la api");
		console.log(error);
	}

	try {
		let q = {};

		if (!or) {
			if (nameReq)
				q = { ...q, $or: [{ name: name }, { "biography.full-name": name }] };
			if (publisherReq) q = { ...q, "biography.publisher": publisher };
			if (alignmentReq) q = { ...q, "biography.alignment": alignment };
			if (genderReq) q = { ...q, "appearance.gender": gender };
			if (firstAppearanceReq)
				q = { ...q, "biography.first-appearance": firstAppearance };
		} else {
			q.$or = [];

			if (nameReq) {
				q.$or.push({ name: name });
				q.$or.push({ "biography.full-name": name });
			}
			if (publisherReq) q.$or.push({ "biography.publisher": publisher });
			if (alignmentReq) q.$or.push({ "biography.alignment": alignment });
			if (genderReq) q.$or.push({ "appearance.gender": gender });
			if (firstAppearanceReq)
				q.$or.push({ "biography.first-appearance": firstAppearance });
		}

		console.log(q);
		const heroes = await HeroModel.find(q);

		// console.log(heroes);

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
				try {
					const heroData = await getById_SuperHeroApi(id);

					if (heroData) return;

					console.log(id);

					heroFromCloud.push(heroData);

					await new Promise((resolve) => setTimeout(resolve, 1050));
				} catch (error) {
					console.log(error);
				}
			})
		);

		const newSaveHeroes =
			heroFromCloud.length > 0 ? await saveHeroInDB(heroFromCloud) : [];

		return [...heroesInLocal, ...newSaveHeroes];
	} catch (error) {
		console.log(error);
	}
}

export async function getTheseHeroes(ids) {
	const heroes = await HeroModel.find().where("id").in(ids);

	return heroes;
}
