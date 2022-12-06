import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/dist/client/router';

const Form = ({formData, formNewMovie = true})=> {
    console.log( 'fotm data', formData);

    const [form, setForm] = useState({
        title: formData.title,
        plot: formData.plot 
    });
    const [message, setMessage] = useState([]);

    const router = useRouter();




    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formNewMovie){
            postData(form) 
        }else{
            putData(form);
        }
       
    }

    const postData = async (form) => {
        try {

            const res = await fetch('/api/movie', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    setMessage(oldmessage => [
                        ...oldmessage,
                        { message: error.message }
                    ]

                    );
                }
            } else {
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        }
    }
    const putData = async (form) => {
        const {id} = router.query; 
        try {

            const res = await fetch(`/api/movie/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    setMessage(oldmessage => [
                        ...oldmessage,
                        { message: error.message }
                    ]

                    );
                }
            } else {
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        }
    };
    


  return (
      <form onSubmit={handleSubmit}>
          <input
              className="form-control my-2"
              type="text"
              placeholder="Title"
             // autoComplete="off"
              name="title"
              value={form.title}
              onChange={handleChange}
          ></input>
          <input
              className="form-control my-2"
              type="text"
              placeholder="Plot"
             // autoComplete="off"
              name="plot"
              value={form.plot}
              onChange={handleChange}
          ></input>
          <button className="btn btn-primary w-100 mb-2" type="submit">
            {formNewMovie ?
            'Agregar'
            :
            'Editar'}
          </button>
          <Link href="/" className="btn btn-warning w-100">
              Volver
          </Link>
          {
              message.map(({ message }) => {
                  <p key="">
                      {message}
                  </p>

              })
          }
      </form>
  )
};

export default Form;