import { newFolder_service, 
    findByUserId_service,
    findByName_service,
    delFolder_service
} from "@/service/folders.service";



export async function createNewFolder (req, res) {
	try {
        const { name } = req.body;

        const { authCookie } = req.cookies;
        const user = verify(authCookie, process.env.SECRET_WORD);
        const idUrs = user._id;

        const data = { name, idUrs };
        const folderCreated = await newFolder_service(data);

        if (folderCreated) {
            console.log(`carpeta creada con el nombre ${username} por el usuario ${idUrs} `);
        } else {
            console.log("ya existe una carpeta con ese nombre");
        };

	} catch (error) {
        console.log(error);
    };
};



export async function findFoldersByUser(req, res) {
    try {
      const { authCookie } = req.cookies;
      const user = verify(authCookie, process.env.SECRET_WORD);

      const folders = await findByUserId_service(user._id);
  
      console.log(`Se encontraron ${folders.length} carpetas para el usuario con ID ${user._id}`);
    } catch (error) {
      console.log(error);
    };
};



export async function findFolderByName(req, res) {
    try {
      const { name } = req.params;
      const folder = await findByName_service(name);
  
      if (folder) {
        console.log(`Carpeta encontrada: ${folder}`);
      } else {
        console.log(`No se encontró ninguna carpeta con el nombre "${name}"`);  
      };
    } catch (error) {
      console.log(error);
    };
};



export async function deleteFolder(req, res) {
    try {
      const { folderId } = req.query;
      const folderDeleted = await delFolder_service(folderId);
  
      if (folderDeleted) {
        console.log(`carpeta eliminada con el ID ${folderId}`);
      } else {
        console.log(`No se encontró ninguna carpeta con el ID ${folderId}`);
      };

    } catch (error) {
      console.log(error);
    };
};