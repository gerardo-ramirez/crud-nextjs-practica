import conectarDB from "../../../lib/dbConnection";
import Movie from '../../../models/Movies';

export default async function handler(req, res) {
    await conectarDB();
    //GET  api/movie/id
    //DELETE  api/movie/id

    const { method, query:{id} } = req;
    switch (method) {
        case 'GET':
            try {
                const movie = await 
             Movie.findById(id).lean();
               
                if(!movie){
                    return res.status(404).json({success: false})
                }

                res.json({success: true, data: movie }); 

            } catch (error) {
                return res.status(404).json({ success: false })

            }

            break;
        case 'DELETE':
            try {
                const movieDelete = await Movie.findByIdAndDelete(id);

                if (!movieDelete) {
                    return res.status(404).json({ success: false })
                }

                res.json({ success: true, data: movieDelete });

            } catch (error) {
                return res.status(404).json({ success: false })

            }

        break
        case 'PUT':
            try {
                const movieUpdate = await Movie.findByIdAndUpdate(id, req.body,{
                    new: true,//retornar el doc actualizado
                    runValidators: true //para que funcionen nuestras validaciones 
                });

                if (!movieUpdate) {
                    return res.status(404).json({ success: false })
                }

                res.json({ success: true, data: movieUpdate });

            } catch (error) {
                return res.status(404).json({ success: false, error })

            }

            break

        default:
            return res.status(500).json({ success: false, error: "falla del servidor" })
            break;
    }

}