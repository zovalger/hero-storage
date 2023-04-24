import {
	createHeroRelation_service,
	findRelationBy_Id,
	findRelationsBy_FolderId,
	deleteRelationBy_Id,
} from "@/service/folderHeroRelation.service.js";

export async function createNewRelation(req, res) {
	try {
		const { idHero, idFolder } = req.query;
		const relation = await createHeroRelation_service(idHero, idFolder);

		if (!relation)
			console.log({ error: { message: "no se pudo realizar la relacion" } });

		if (relation.error) console.log(relation.error);

		console.log(`relacion creada entre ${idHero} y ${idFolder} `);
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

export async function deleteRelationById(req, res) {
	try {
		const { id } = req.params;
		const deletedRelation = await deleteRelationBy_Id(id);

		if (deletedRelation) {
			console.log(`relacion ${deletedRelation} eliminada`);
		} else {
			console.log("relacion no encontrada");
		}
	} catch (error) {
		console.log(error);
	}
}
