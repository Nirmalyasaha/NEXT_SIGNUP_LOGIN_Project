import InputFieldCommon from "@/ui/CommonInput/CommonInput"
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary"
import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from '@/styles/login.module.css'
import Link from "next/link"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import validationText from "@/json/messages/validationText"
import { useMutation } from "@tanstack/react-query"
import { loginMutation } from "@/api/functions/user.api"
import { useAppDispatch } from "@/hooks/redux/useAppDispatch"
import { useRouter } from "next/router"
import { setAccessToken, setLogInData } from "@/reduxtoolkit/slices/userSlice"
import { useAppSelector } from "@/hooks/redux/useAppSelector"
import Wrapper from "@/layout/wrapper/Wrapper"
import { toast } from "sonner"
import { setCookie } from 'cookies-next';



export interface LogInInputs{
email:string,
password:string
}


const schema=yup.object({

    email:yup.string().required(validationText.error.enter_email),
    password:yup.string().required(validationText.error.enter_password)

}).required()

export type LogInSchema= yup.InferType<typeof schema>





export default function LOGIN(){

    
    const router=useRouter();

    const dispatch=useAppDispatch();

    const isLoggedIn=useAppSelector((state)=>state.userSlice)
    console.log("log in data",isLoggedIn)

    const {
        register,
        handleSubmit,
        formState: { errors }, } = 
        useForm<LogInInputs>({
            resolver: yupResolver(schema)    
       
        })
            
        const {mutate,error,data}=useMutation({mutationFn: loginMutation})

      const onSubmit = (data:LogInSchema) => {
        console.log(data);
        mutate({...data},{
            onSuccess:(res)=>{
                console.log("login res",res)
                if (res.data.status === 200) {
                    // console.log("signed", data);
                    if (res?.data) {
                      const { access, ...userData } = res.data;
                      toast.success(res?.data?.message);
                      setCookie('token', userData.token)
                      console.log("Token:-", userData.token);
                      dispatch(setAccessToken(userData.token));
                      dispatch(setLogInData(userData));
                     
                      router.push("/")
                     
                      
                   
                    }
                  }}
        })
        
      }
    


    return(
    <Wrapper>


        <Box className={styles.logINForm} >

            <Typography sx={{fontWeight:"bold", color:"black",fontSize:"30px"}} > LogIn</Typography>

        <form  onSubmit={handleSubmit(onSubmit)} className={styles.formgroup}>

        <InputFieldCommon
         label="Email"
          type="text" 
          {...register("email")} 
          sx={{width:400,marginBottom:"10px"}}
          />

        <InputFieldCommon 
        type="text" 
        label="PassWord"
         {...register("password")} 
         />
        
        <CustomButtonPrimary 
        sx={{margin:"15px"}} 
        variant="contained"color="primary"         
        type="submit">Submit</CustomButtonPrimary>

        <Typography >Don't Have An Acount?Please--
            <Link href={"/auth/signup"}>Sign Up</Link>

        </Typography>
        <Link href={"/auth/forgotpwd"}>Forgot password</Link>

        </form>
        </Box> 
        </Wrapper>

    )
}