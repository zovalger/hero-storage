import {
	createHeroRelation_service,
	findRelationBy_Id,
	findRelationsBy_FolderId,
	deleteRelationByFolderAndHero_service,
	getHeroesInFolder_service,
	createHeroFavoriteRelation_service,
	deleteFavoriteRelationByHero_service,
} from "@/service/folderHeroRelation.service.js";
import { verify } from "jsonwebtoken";

export async function createNewRelation(req, res) {
	try {
		const { idHero, idFolder } = req.query;
		const relation = await createHeroRelation_service(idHero, idFolder);

		if (!relation)
			return res
				.status(404)
				.json({ error: { message: "no se pudo realizar la relacion" } });

		if (relation.error) return res.status(404).json(relation);

		console.log(`relacion creada entre ${idHero} y ${idFolder} `);
		return res.status(200).json(relation);
	} catch (error) {
		console.log(error);
	}
}

export async function createFavoriteRelation(req, res) {
	try {
		const { idHero } = req.query;
		const { authCookie } = req.cookies;
		const { _id: idUser } = verify(authCookie, process.env.SECRET_WORD);

		const relation = await createHeroFavoriteRelation_service(idHero, idUser);

		if (!relation)
			return res
				.status(404)
				.json({ error: { message: "no se pudo realizar la relacion" } });

		if (relation.error) return res.status(404).json(relation);

		return res.status(200).json(relation);
	} catch (error) {
		console.log(error);
	}
}

// todo: revisar si es necesaria
export async function findRelationById(req, res) {
	try {
		const { id } = req.query;
		const relation = await findRelationBy_Id(id);

		console.log(`relacion encontrada: ${relation}`);
	} catch (error) {
		console.log(error);
	}
}

export async function findRelationByFolderId(req, res) {
	try {
		const { idFolder } = req.query;
		const relations = await findRelationsBy_FolderId(idFolder);

		console.log(`relacion(es) encontrada(s): ${relations}`);
	} catch (error) {
		console.log(error);
	}
}

export async function deleteRelationByFolderAndHero(req, res) {
	try {
		const { idFolder, idHero } = req.query;

		const deletedRelation = await deleteRelationByFolderAndHero_service(
			idFolder,
			idHero
		);

		if (!deletedRelation)
			return res
				.status(404)
				.json({ error: { message: "relacion no encontrada" } });

		console.log("relacion eliminada:", deletedRelation);
		return res.status(200).json({ success: true, message: "Heroe eliminado" });
	} catch (error) {
		console.log(error);
	}
}

export async function deleteFavoriteRelationByHero(req, res) {
	try {
		const { idHero } = req.query;
		const { authCookie } = req.cookies;
		const { _id: idUser } = verify(authCookie, process.env.SECRET_WORD);

		const deletedRelation = await deleteFavoriteRelationByHero_service(
			idHero,
			idUser
		);

		if (!deletedRelation)
			return res
				.status(404)
				.json({ error: { message: "relacion no encontrada" } });

		console.log("relacion eliminada:", deletedRelation);
		return res.status(200).json({ success: true, message: "Heroe eliminado" });
	} catch (error) {
		console.log(error);
	}
}

export async function getHeroesInFolder(req, res) {
	try {
		const { idFolder } = req.query;

		const heroes = await getHeroesInFolder_service(idFolder);

		if (!heroes)
			return res.status(404).json({
				error: { message: "No se pudieron obtener los heroes de la carpeta" },
			});

		if (heroes.error) return res.status(500).json(heroes);

		return res.status(200).json(heroes);
	} catch (error) {
		console.log(error);
	}
}
