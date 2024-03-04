import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "@/styles/signup.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import validationText from "@/json/messages/validationText";
import { Resolver } from "dns";
import { useMutation } from "@tanstack/react-query";
import { signUpMutation } from "@/api/functions/user.api";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Wrapper from "@/layout/wrapper/Wrapper";
import { emailRegex } from "@/lib/functions/_helpers.lib";
import Link from "next/link";

export interface SignUpInputs {
  fullName: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    fullName: yup.string().required(validationText.error.fullName),
    email: yup
      .string()
      .trim()
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format),
    password: yup.string().required(validationText.error.enter_password)
  })
  .required();

export type SignUpSchema = yup.InferType<typeof schema>;

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignUpInputs>({
    resolver: yupResolver(schema)
  });

  const { mutate, data, error } = useMutation({ mutationFn: signUpMutation });

  const onSubmit = (data: SignUpSchema) => {
    console.log(data);

    mutate(
      { ...data },
      {
        onSuccess: (resp) => {
          if (resp.data.status === 200) {
            console.log("signed", data);

            toast.success(resp?.data?.message);
            router.push("/auth/login");
          }
        }
      }
    );
  };

  return (
    <Wrapper>
      <Box className={styles.SignUpParent} width="50%" margin="auto">
        <Typography
          sx={{ fontStyle: "inherit", color: "black", fontSize: "30px" }}
        >
          Create A New Acount Here
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.SignupFrom}
        >
          <InputFieldCommon
            type="text"
            label="Full Name"
            {...register("fullName")}
            sx={{ width: 500, marginBottom: "10px" }}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
          />

          <InputFieldCommon
            type="text"
            label="email"
            {...register("email")}
            sx={{ width: 500, marginBottom: "10px" }}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <InputFieldCommon
            type="text"
            label="Pass Word"
            {...register("password")}
            sx={{ width: 500, marginBottom: "10px" }}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <Typography sx={{color:"black"}}>
            Already Have An Acount ? Please Log In Here---
            <Link href={"/auth/login"}>Log In</Link>
          </Typography>

          <CustomButtonPrimary
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </CustomButtonPrimary>
        </Box>
      </Box>
    </Wrapper>
  );
}
