import React from 'react'
import conectarDB from '../../lib/dbConnection';
import Movie from '../../models/Movies';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MoviePage = ({success,error,movie}) => {
    const router  = useRouter();
    

    const deleteData = async (id) => {
        
        try {
            await fetch(`/api/movie/${id}`,{
                method: 'DELETE'
            })
            router.push('/')
        
        } catch (error) {
            console.log(error)
        }
    }

    if (!success){
        return(
        
            <div className='container text-center my-5'>
               <h2>{error}</h2> 
            
            <Link href={"/"} className="btn btn-success">
                Volver...
            </Link></div>
            
        )
    }


    return (
        <div className='container'>

            <h1>
                Detalle de Movie
            </h1>
            <div className='card'>
                <div className='card-body'>
                    <div className='card-title'>
                        <h5 className='text-uppercase'>{movie.title}</h5>
                    </div>
                 <p className="fw-light">{movie.plot}</p>
                </div>
                <Link href={"/"} className="btn btn-success btn-xs m-2">Volver...</Link>
                <Link href={`${movie._id}/edit`} className='btn btn-warning btn-xs m-2'>editar</Link>
                <button className='btn btn-danger btn-xs m-2' onClick={() => deleteData(movie._id)}>Eliminar</button>

            </div>

        </div>

    )
}

export default MoviePage;

export const getServerSideProps = async ({params}) => {
    try {
        await conectarDB();
        const movie= await Movie.findById(params.id).lean();
        
        if (!movie) {
            return { props: { success: false, error: 'error sin pelicula' } }
        }
     
        movie._id = `${movie._id}`;
      
         return { props: { success: true, movie } }
         

    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId'){
            return { props: { success: false, error: 'id no valido' } }

        }
        return { props: { success: false, error: 'error de servidor'} }

    }

}