"use client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, minLength, maxLength, email } from "valibot";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { API_URL, AUTENTICACION_URL } from "@/libs/routes";
import { useAuthStore } from "@/context/authUser";
import { HttpRequest } from "@/helpers/httpRequest";
const LoginSchema = object({
  correo: string([
    minLength(1, "Ingresa tu email."),
    email("El email tiene un formato inválido"),
  ]),
  contraseña: string("Debes ingresar caracteres validos.", [
    minLength(1, "Ingresa tu contraseña"),
    minLength(4, "Tu contraseña debe contener 4 caracteres."),
    maxLength(15, "Tu contraseña no puede contener mas de 15 caracteres."),
  ]),
});

export default function LoginForm() {
  const router = useRouter();
  const { isLogin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(LoginSchema),
  });

  const onSubmit = (e) => {
    console.log("Formulario enviado:", e);
    const req = HttpRequest();

    const url = `${API_URL}${AUTENTICACION_URL}`;
    const options = {
      headers: { "content-type": "application/json" },

      body: {
        correo: e.correo,
        password: e.contraseña,
      },
    };
    req.post(url, options).then((res) => {
      if (res.token) {
        isLogin(res);
        router.push("/");
      } else {
        console.log("error");
      }
    });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form
        className="flex flex-col w-full justify-start items-start gap-6 lg:justify-center lg:items-center lg:w-[328px] lg:mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder="Correo electrónico"
          type="email"
          className="input"
          {...register("correo")}
        />
        {errors.correo && <p className="errormsj">{errors.correo?.message}</p>}
        <input
          placeholder="Contraseña"
          type="password"
          className="input"
          {...register("contraseña")}
        />
        {errors.contraseña && (
          <p className="errormsj">{errors.contraseña?.message}</p>
        )}

        <button type="submit" className="registerBtn">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
