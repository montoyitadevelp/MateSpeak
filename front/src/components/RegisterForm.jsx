import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";

import {
  email,
  minLength,
  maxLength,
  object,
  string,
  ValiError,
} from "valibot";

const RegisterSchema = object(
  {
    name: string([
      minLength(2, "Tu nombre debe tener un mínimo de dos caracteres"),
    ]),
    lastname: string([
      minLength(1, "Tu apellido debe tener un mínimo de un caracteres"),
    ]),
    username: string([
      minLength(1, "Tu username debe tener un mínimo de 1 caracteres"),
      maxLength(10, "Tu username debe tener un máximo de 10 caracteres"),
    ]),
    email: string([
      minLength(1, "Debes ingresar un e-mail."),
      email("Tu e-mail cuenta con un formato incorrecto."),
    ]),
    password: string([
      minLength(1, "Ingresa tu contraseña"),
      minLength(6, "Tu password debe contener de 6 caracteres"),
    ]),
    confirmpassword: string([
      minLength(1, "Confirma tu contraseña"),
      minLength(6, "Tu contraseña debe contener 6 caracteres"),
    ]),
    city: string([minLength(2, "Por favor ingresa tu ciudad")]),
    nativelanguage: string([minLength(2, "Elije un idioma del listado")]),
    languagetolearn: string([minLength(2, "Elije un idioma a aprender del listado")]),
    level: string([minLength(2, "Debes seleccionar un nivel del listado")]),
  },
  [
    (input) => {
      if (input.password !== input.confirmpassword) {
        throw new ValiError([
          {
            reason: "string",
            validation: "custom",
            origin: "value",
            message: "Las contraseñas no son iguales.",
            input: input.confirmpassword,
            path: [
              {
                schema: "object",
                input: input.confirmpassword,
                key: "confirmpassword",
                value: input.confirmpassword,
              },
            ],
          },
        ]);
      }
      return input;
    },
  ]
);
export const RegisterForm = ({ setFormView, formView, user, setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: valibotResolver(RegisterSchema) });

  const onSubmit = (data) => {
    setUser({
      ...data,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    });
    setFormView(formView + 1);
  };

  return (
    <>
      <aside className="flex flex-col justify-start  w-full mb-4">
        <h1 className="text-xl text-black font-semibold text-left mb-2">
          Creá una cuenta
        </h1>
        <span className="text-sm text-black flex gap-4 font-semibold">
          <h2 className="text-gray-400 font-light">¿Ya tenés cuenta?</h2>Inicia
          sesión
        </span>
      </aside>
      {formView === 1 && (
        <form
          className="flex flex-col w-full justify-start items-start gap-6"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <input
              placeholder="Nombres"
              name="name"
              type="text"
              className="input"
              {...register("name")}
            />
            {errors.name && <p className="errormsj">{errors.name.message}</p>}
          </div>
          <div className="w-full">
            <input
              placeholder="Apellido"
              name="lastname"
              type="text"
              className="input"
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className="errormsj">{errors.lastname.message}</p>
            )}
          </div>

          <div className="w-full">
            <input
              placeholder="Correo electrónico"
              name="email"
              type="email"
              className="input"
              {...register("email")}
            />
            {errors.email && <p className="errormsj">{errors.email.message}</p>}
          </div>

          <div className="w-full">
            <input
              placeholder="Contraseña"
              name="password"
              type="password"
              className="input"
              {...register("password")}
            />
            {errors.password && (
              <p className="errormsj">{errors.password.message}</p>
            )}
          </div>
          {/*       <input
        placeholder="Confirmar contraseña"
        name="confirmpassword"

        type="password"
        className="input"
        {...register("password")}
      />

      {errors.confirmPaswordpassword && (
        <p className="errormsj">
          {errors.confirmPaswordpassword.message}
        </p>
      )} */}
          <input
            className="registerBtn"
            type="submit"
            value="Crear Cuenta"
          />
        </form>
      )}
    </>
  );
};