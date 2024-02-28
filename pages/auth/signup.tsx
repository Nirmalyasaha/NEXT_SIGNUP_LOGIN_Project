import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "@/styles/signup.module.css"

interface SignUpInptuts{
 fullName: string,
  email: string,
  password:string

}

export default function SignUp(){

    const {register,handleSubmit,watch,formState: { errors }, } = useForm<SignUpInptuts>()

    const onSubmit: SubmitHandler<SignUpInptuts> = (data) => console.log(data)
  
    console.log(watch("email")) // watch input value by passing the name of it

    return (
        <Box className={styles.SignUpParent} >

            <Typography sx={{fontWeight:"bold", color:"black",fontSize:"30px"}}>Sign Up</Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.SignupFrom} >
    
       <InputFieldCommon type="text" label="Full Name" {...register("fullName")} sx={{width:500 ,marginBottom:"10px"}}/>

       <InputFieldCommon type="text" label="email" {...register("email")} sx={{width:500 ,marginBottom:"10px"}}/>

       <InputFieldCommon type="text" label="Pass Word" {...register("password")} sx={{width:500 ,marginBottom:"10px"}}/>
     
      <CustomButtonPrimary variant="contained"color="primary"  type="submit" >
        Submit
      </CustomButtonPrimary>

    </Box>




        </Box>
    )






}









