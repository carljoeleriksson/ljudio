import React, { useState, useContext } from 'react';

const useForm = (validate) => {
   const [values, setValues] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
   });
   const [errors, setErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   function handleChange(e) {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: value,
      });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      // let user = {
      //    firstname: firstname.value,
      //    lastname: lastname.value,
      //    email: email.value,
      //    password: password.value,
      //    password2: password2.value,
      // };

      // let res = await fetch('http://localhost:8000/api/registerMemeber', {
      //    method: 'POST',
      //    headers: { 'Content-Type': 'application/json' },
      //    body: JSON.stringify(user),
      // });
      // let updatedUser = await res.json();
      // console.log(updatedUser);

      setErrors(validate(values));
      setIsSubmit(true);
   }

   // useEffect(() => {
   //    if(Object.keys(errors).length === 0 && isSubmit) {

   //    }
   // }, [errors])

   return { handleChange, values, handleSubmit, errors };
};

export default useForm;
