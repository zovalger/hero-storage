import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	res.status(200).json({ name: "por busqueda" });

	// buscar en superhero api

	// guardar en DB local

	// hacer misma consulta en DB local

	// enviar datos
}
