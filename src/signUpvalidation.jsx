import * as Yup from 'yup';

export const signUpvalidation= Yup.object({

    name:Yup.string().min(3).required("enter name"),
    email:Yup.string().email("plzz enter valid email").required("plzz enter the email"),
    password:Yup.string().min(5).required("plzz enter password")
})