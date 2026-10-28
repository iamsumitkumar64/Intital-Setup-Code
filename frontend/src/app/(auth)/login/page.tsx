"use client"

import styles from "./login.module.css"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginSchemaType } from "@/schemas/login"
import { loginUser, firebaseGoogleLogin } from "@/redux/feature/user/user-action"
import { signInWithGoogle } from "@/service/firebase.service"
import { useRouter } from "next/navigation"

import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
    Divider
} from "@mui/material"
import { enqueueSnackbar } from "notistack"
import Image from "next/image"

export default function LoginForm() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginSchemaType) => {
        try {
            await dispatch(loginUser(data)).unwrap()
            router.replace("/")
        } catch (error) {
            enqueueSnackbar(String(error || "Something wrong"), { variant: "error" });
            console.log(error)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const { idToken } = await signInWithGoogle();
            await dispatch(firebaseGoogleLogin(idToken)).unwrap();
            enqueueSnackbar("Successfully signed in with Google!", { variant: "success" });
            router.replace("/");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error || "Google sign in failed");
            enqueueSnackbar(message, { variant: "error" });
            console.error(error);
        }
    }

    return (
        <Box className={styles.container}>
            <Card className={styles.formWrapper} elevation={3}>
                <Typography variant="h5" className={styles.title}>
                    Sign In
                </Typography>

                <Button
                    variant="outlined"
                    className={styles.providerLoginBox}
                    onClick={handleGoogleLogin}
                >
                    <Image
                        src={'/google.svg'}
                        alt="google icon"
                        width={22}
                        height={22}
                    />
                    <Typography>
                        Login with Google
                    </Typography>
                </Button>

                <Divider className={styles.divider}>OR</Divider>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className={styles.error}>
                                {errors.email.message}
                            </span>
                        )}
                    </Box>

                    <Box className={styles.field}>
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            {...register("password")}
                        />
                        {errors.password && (
                            <span className={styles.error}>
                                {errors.password.message}
                            </span>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        type="submit"
                        className={styles.button}
                    >
                        Login
                    </Button>
                </form>

                <Button
                    variant="text"
                    className={styles.button}
                    onClick={() => router.replace("/signup")}
                >
                    Create New Account?
                </Button>
            </Card>
        </Box>
    )
}
