import multer from 'multer'
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from '@utils/applicationError'
import responseMessage from '@utils/responseMessage';



// Configuración de multer para almacenar los archivos en la carpeta "public"
const configureMulterStorage = () => {
    const storage = multer.diskStorage({
        destination: (
            req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void
        ) => {
            callback(null, `${__dirname}/../../public`);
        },
        filename: (
            req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void
        ) => {
            setTimeout(() => {
                callback(null, `${Date.now()}-${file.originalname}`); //TODO 123123213232-pepito.pdf
            }, 10)
        }
    });
    // return multer({ storage: storage }).any()
    return multer({ storage: storage })
}


interface INameFields {
    name: string;
    maxCount: number;
}

export const fileMulterHandler = (nameFields: INameFields[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const upload = configureMulterStorage().fields(nameFields)

            await new Promise((resolve, reject) => {
                upload(req, res, (error: any) => {
                    if (error instanceof multer.MulterError) {
                        reject(new ApplicationError({
                            message: `Ocurrio un error al procesar los archivos. Intentelo nuevamente`
                        }))
                    } else if (error) {
                        reject(new ApplicationError({
                            message: 'Ocurrio un error desconocido al cargar el archivo'
                        }))
                    }
                    resolve(undefined);
                });
            });

            nameFields.forEach((field: INameFields) => {
                // VER no funciona correctamente
                req.files[field.name].forEach((file:any) =>{
                    let files = []
                    if (file.fieldname === field.name) {
                        files.push(file)
                    }
                    req.body[field.name] = files
                })
            })

            return next();
        } catch (error: any) {
            return res.json(responseMessage.error<any>({
                message: error.message
            }))
        }
    }
}