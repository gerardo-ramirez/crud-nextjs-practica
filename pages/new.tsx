import Link from 'next/link';
import React, { useState } from 'react';
import {useRouter } from 'next/dist/client/router';
import Form from '../components/Form';

const New =() =>{

  const formData={
    title:' ',
    plot:' '
  }
 
  return (
    <div className="container">
      <h1 className="my-3">Agregar Movies</h1>
      <Form formData={formData} />
    </div>
  );
}
export default New