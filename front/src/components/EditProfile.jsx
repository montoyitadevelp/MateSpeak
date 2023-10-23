import { useForm } from "react-hook-form";
import Image from "next/image";
import avatar from "../assets/icons/avatar.png";

export const EditProfile = ({ user, setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setUser({
      ...user,
      country: data.country,
      nativeLanguage: data.nativeLanguage,
      languageToLearn: data.languageToLearn,
      level: data.level,
      username: data.username,
    });
    console.log(user);
  };

  console.log(user);

  return (
    <>
      <section className="w-full">
        <article className="my-4 flex flex-col items-center lg:items-start">
          <h1 className="text-xl text-black font-extrabold text-left mb-2 lg:text-[26px]">
            Completá tu perfil
          </h1>
          <p className="text-center mb-4 lg:w-[256px] lg:text-left text-sm text-[#545454] font-light">
            Completa tu información para una mejor experiencia en la plataforma
          </p>
        </article>
      </section>
      <form
        className="flex flex-col w-full justify-start items-start gap-6 lg:justify-center lg:items-center lg:w-[328px] lg:mt-8"
        onSubmit={handleSubmit(onSubmit)}>
        <Image
          className="object-contain self-center"
          src={avatar}
          alt="avatar img"
        />
        <div className="w-full">
          <input
            placeholder="username"
            name="username"
            type="text"
            className="input"
            {...register("username", {
              required: {
                value: true,
                message: "Debes ingresar un username",
              },
            })}
          />
          {errors.username && (
            <p className="errormsj">{errors.username.message}</p>
          )}
        </div>

        <div className="w-full">
          <select
            {...register("country")}
            name="country"
            className="select">
            <option
              className="option"
              value="">
              Yo soy de
            </option>
            <option
              className="option"
              value="argentina">
              Argentina
            </option>
            <option
              className="option"
              value="colombia">
              Colombia
            </option>
            <option
              className="option"
              value="venezuela">
              Venezuela
            </option>
            <option
              className="option"
              value="chile">
              Chile
            </option>
          </select>
          {errors.country && (
            <p className="errormsj">{errors.country.message}</p>
          )}
        </div>

        <div className="w-full">
          <select
            {...register("nativeLanguage")}
            name="nativeLanguage"
            className="select">
            <option value="">Idioma nativo</option>
            <option value="english">Inglés</option>
            <option value="spanish">Español</option>
          </select>
          {errors.nativeLanguage && (
            <p className="errormsj">{errors.nativeLanguage.message}</p>
          )}
        </div>

        <div className="w-full">
          <select
            {...register("languageToLearn")}
            name="languageToLearn"
            className="select">
            <option value="">Me interesa</option>
            <option value="english">Inglés</option>
            <option value="spanish">Español</option>
          </select>
          {errors.languageToLearn && (
            <p className="errormsj">{errors.languageToLearn.message}</p>
          )}
        </div>

        <div className="w-full">
          <select
            {...register("level")}
            name="level"
            className="select">
            <option value="-">Nivel</option>
            <option value="begginer">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
          {errors.level && <p className="errormsj">{errors.level.message}</p>}
        </div>

        <input
          type="submit"
          value="Completar tu perfil"
          className="registerBtn"
        />
      </form>
    </>
  );
};