import axios from "axios";

export async function getById_SuperHeroApi(id) {
	try {

    const res =await axios.get(`${process.env.SUPERHERO_URI}/${id}`);
		return res.data
	} catch (error) {
		console.log(error);
	}
}

export async function getByName_SuperHeroApi(nameHero) {
	try {
		const res = await axios.get(`${process.env.SUPERHERO_URI}/search/${nameHero}`);
    return res.data
	} catch (error) {
		console.log(error);
	}
}
