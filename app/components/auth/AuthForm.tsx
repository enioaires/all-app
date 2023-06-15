"use client";
import { FC, useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import AuthSocialButton from "./AuthSocialButton";
import Input from "../inputs/Input";
import { Button } from "../Button";
import { Github } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm: FC = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      await axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Cadastro realizado com sucesso");
          setVariant("LOGIN");
        })
        .catch(() => {
          toast.error("Erro ao cadastrar, tente novamente mais tarde");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Email ou senha incorretos, tente novamente");
            setValue("password", "");
          } else {
            toast.success("Login realizado com sucesso");
            router.refresh();
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    if (action === "github") {
      signIn("github", {
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Erro ao entrar com o Github, tente novamente");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Nome"
              register={register}
              id="name"
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            label="Email"
            type="email"
            register={register}
            id="email"
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label="Senha"
            type="password"
            register={register}
            id="password"
            errors={errors}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {variant === "LOGIN" ? "Entrar" : "Cadastrar"}
          </Button>
        </form>

        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Ou continue com
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={Github}
              onClick={() => socialAction("github")}
            />
          </div>
        </div> */}

        {/* <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN" ? "Não tem uma conta?" : "Já tem uma conta?"}
          </div>
          <div
            onClick={toggleVariant}
            className="cursor-pointer text-emerald-700 hover:text-emerald-600"
          >
            {variant === "LOGIN" ? "Cadastre-se" : "Entre"}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AuthForm;
