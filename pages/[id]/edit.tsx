import React from 'react'
import Form from '../../components/Form'
import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = async url => {
  const res = await fetch(url)

  // Si el status code no esta en el rango 200-299,
  // seguimos intentando analizarlo y lanzarlo.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Adjunta información extra al objeto de error.
    error.info = await res.json()
    error.status = res.status
    throw error
  }
const {data} = await res.json()
  return data
}
const EditMovie =() => {



  const router = useRouter();
  const { id } =router.query

const {data: movie, error } = useSWR(id ? `/api/movie/${id}` : null, fetcher);
//console.log(movie.title, movie.plot)
if(error){
  <div>
    Error
  </div>
}
if(!movie){
  return(
    <div>
      loading...
    </div>
  )
}

  const formData={
    title: movie.title,
    plot: movie.plot

  };

  return (
    <div className='container'><h1>Editar Movie</h1>
    
    <Form formData={formData}  formNewMovie={false}/>
    
    </div>
  )
}
export default EditMovie
