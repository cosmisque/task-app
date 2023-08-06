import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useStyles } from "../components/navbar/useStyles";
import { useMutation } from "@tanstack/react-query";
import { LoginInput, loginUserFn } from "../api/authApi";
import { AxiosError } from "axios";
import { useContext } from "react";
import { User } from "../types";
import UserContext from "../components/context/UserContext";
import { useNavigate } from "react-router-dom";

// let renderCount = 0;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { setIsAuth } = useContext<User>(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<LoginInput>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate } = useMutation(loginUserFn, {
    onSuccess: () => {
      setIsAuth(true);
      navigate("/tasks");
    },
  });

  const onSubmit = (data: LoginInput) => {
    mutate(data);
  };

  // renderCount++;

  return (
    <Container fluid className={classes.center}>
      {/* <h1>Login ({renderCount / 2})</h1> */}
      <Paper
        radius="sm"
        p="xl"
        withBorder
        w={400}
        h={300}
        className={classes.paper}
        style={{
          borderColor: "#82c91e",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing="lg">
            <TextInput
              className={classes.input}
              label="Email"
              type="email"
              placeholder="Email"
              onKeyDown={(e) =>
                e.key === "Enter" ? handleSubmit(onSubmit) : ""
              }
              {...register("username", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email format",
                },
              })}
              error={errors.username?.message}
            />
            <PasswordInput
              className={classes.passwordInput}
              label="Password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
              onKeyDown={(e) =>
                e.key === "Enter" ? handleSubmit(onSubmit) : ""
              }
            />
            <Stack justify="center">
              <Button type="submit" color="lime">
                Login
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
      <DevTool control={control} />
    </Container>
  );
};