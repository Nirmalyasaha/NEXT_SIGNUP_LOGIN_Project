import InputFieldCommon from "@/ui/CommonInput/CommonInput"
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary"
import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from '@/styles/login.module.css'
import Link from "next/link"



interface Inputs{
email:string,
password:string
}



export default function LOGIN(){

    const {register,handleSubmit,watch,formState: { errors }, } = useForm<Inputs>()

      const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    
      console.log(watch("email")) // watch input value by passing the name of it


    return(
    

        <Box className={styles.logINForm} >

            <Typography sx={{fontWeight:"bold", color:"black",fontSize:"30px"}} > LogIn</Typography>

        <form  onSubmit={handleSubmit(onSubmit)} className={styles.formgroup}>

        <InputFieldCommon label="Email" type="text" {...register("email")} sx={{width:400,marginBottom:"10px"}}/>

        <InputFieldCommon type="text" label="PassWord" {...register("password")} />
        
        <CustomButtonPrimary sx={{margin:"15px"}} variant="contained"color="primary"         type="submit">Submit</CustomButtonPrimary>

        <Typography >Don't Have An Acount?Please--
            <Link href={"/auth/signup"}>Sign Up</Link>
        </Typography>
        </form>
        </Box> 

    )
}