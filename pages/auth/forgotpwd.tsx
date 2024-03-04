import {
  ForgotPassword,
  ForgotpwdType,
  OTP,
  RESETPassword
} from "@/api/functions/user.api";
import validationText from "@/json/messages/validationText";
import Wrapper from "@/layout/wrapper/Wrapper";
import { emailRegex } from "@/lib/functions/_helpers.lib";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import styles from "@/styles/forgot.module.css";

//////------FORGOT PWD------

const ForgotSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format)
  })
  .required();

export type ForgotSchemaType = yup.InferType<typeof ForgotSchema>;

//////-------OTP----

const Otpschema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format),

    otp: yup.string()
  })
  .required();

export type OtpSchemaType = yup.InferType<typeof Otpschema>;

//////////RESET PWD ---------

const ResetSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format),

    password: yup.string().required(validationText.error.enter_password),

    confirm_password: yup.string()
  })
  .required();

export type ResetSchemaType = yup.InferType<typeof ResetSchema>;

//////////TYPE END HERE=------

const Forgotpwd = () => {
  ///////// FUNCTION FOR FORGOT PASSWORD---------

  const router = useRouter();

  const [isGetOTP, setIsGetOTP] = useState(false);
  const [mail, setMail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ForgotpwdType>({
    resolver: yupResolver(ForgotSchema)
  });

  const { mutate, error } = useMutation({ mutationFn: ForgotPassword });
  console.log("forgot");

  const ForgotPWDSubmit = (dataforgot: ForgotSchemaType) => {
    // console.log(data)
    mutate(
      {
        ...dataforgot
      },
      {
        onSuccess: (resp) => {
          if (resp.status === 200) {
            setIsGetOTP(true);
            setMail(resp.data.data.email);
            toast.success(resp?.data.message);
          }
        }
      }
    );
  };

  ///////// FUNTION FOR OTP---------------

  const [verifyOTP, setVeryfyOTP] = useState(false);
  const { register: OtpReg, handleSubmit: SubmitOtp } = useForm({
    resolver: yupResolver(Otpschema),
    mode: "all",
    defaultValues: {
      email: "",
      otp: ""
    }
  });
  const { mutate: OtpMutate } = useMutation({
    mutationFn: OTP
  });
  const handleOtp = (data: OtpSchemaType) => {
    OtpMutate(
      { ...data },
      {
        onSuccess: (response) => {
          if (response?.data?.status === 200) {
            toast.success(response?.data?.message);
            setVeryfyOTP(true);
          }
        }
      }
    );
  };

  //////////FUNCTION FOR RESET PASSWORD --------

  const { register: resetRegister, handleSubmit: ResetSubmit } = useForm({
    resolver: yupResolver(ResetSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      confirm_password: ""
    }
  });
  const { mutate: ResetMutate } = useMutation({ mutationFn: RESETPassword });
  //console.log("regre");

  const handlePasswordReset = (data: ResetSchemaType) => {
    console.log("reset", data);

    ResetMutate(
      { ...data },
      {
        onSuccess: (response) => {
          if (response?.data?.status === 200) {
            toast.success(response?.data?.message);
            router.push("/auth/login");
          }
        }
      }
    );
  };

  return (
    <>
      <Wrapper>
        {!isGetOTP ? (
          <>
            <Box className={styles.fgtpwd_Main}>
              <form onSubmit={handleSubmit(ForgotPWDSubmit)}>
                <InputFieldCommon
                  label="Email"
                  type="email"
                  {...register("email")}
                  sx={{ width: 400, marginBottom: "10px" }}
                />

                <CustomButtonPrimary
                  sx={{ margin: "15px"}}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Send Otp
                </CustomButtonPrimary>
              </form>
            </Box>
          </>
        ) : !verifyOTP ? (
          <>
            <Box className={styles.Otp_Main}>
              <form onSubmit={SubmitOtp(handleOtp)}>
                <InputFieldCommon
                  label="Email"
                  type="email"
                  value={mail}
                  {...OtpReg("email")}
                  sx={{ width: 400, marginBottom: "10px", mx: 6 }}
                />
                <InputFieldCommon
                  label="OTP"
                  type="text"
                  {...OtpReg("otp")}
                  sx={{ width: 400, marginBottom: "10px", mx: 6 }}
                />
                <CustomButtonPrimary
                  sx={{ margin: "15px"}}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  <Typography>Verify OTP</Typography>
                </CustomButtonPrimary>
              </form>
            </Box>
          </>
        ) : (
          <>
            <form onSubmit={ResetSubmit(handlePasswordReset)}>
              <InputFieldCommon
                required
                type="text"
                value={mail}
                aria-readonly
                sx={{
                  my: 1
                }}
                {...resetRegister("email")}
              />
              <InputFieldCommon
                required
                type="password"
                label="Password"
                sx={{
                  my: 1
                }}
                {...resetRegister("password")}
              />
              <InputFieldCommon
                required
                type="password"
                label="Confirm Password"
                sx={{
                  my: 1
                }}
                {...resetRegister("confirm_password")}
              />
              <CustomButtonPrimary
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  margin: "auto"
                }}
              >
                <Typography>Reset Password</Typography>
              </CustomButtonPrimary>
            </form>
          </>
        )}
      </Wrapper>
    </>
  );
};
export default Forgotpwd;
