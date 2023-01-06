import React from "react";
import { LoginFormComp } from "./styledcomponents";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { iLoginRequest, iRegisterRequest, iEditRequest } from "../../types/types";
import { useContext } from "react";
import { userContext } from "../../contexts/userContext";
import { Input } from "../input/styledComponents";
import { loadingContext } from "../../contexts/loadingContext";
import { CircleLoader, DotLoader, PulseLoader } from "react-spinners";
import { ResetTv } from "@mui/icons-material";

const EditForm = () => {
  const { edit, user, token } = useContext(userContext);
  const { loading, toggleLoading } = useContext(loadingContext);

  const schema = yup.object().shape({
    username: yup.string().required("Entre um nome"),
    password: yup.string(),
    /*.matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,50}$/,
        "Senha deve conter 1 caractere maísculo, 1 minusculo, 1 caractere especial, 1 número e mínimo de 6 caracteres. "
      )*/ passwordConfirm: yup
      .string()
      .test("passwords-match", "Senhas devem corresponder!", function (value) {
        return this.parent.password === value;
      }),
    avatar: yup.string().required("você precisa entrar um avatar válido!"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<iEditRequest>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [showPass, toggleShowPass] = useState<boolean>(false);
  return (
    <LoginFormComp
      onSubmit={handleSubmit((data:iEditRequest , event) => {
        if(data.password){
          edit(user!.id, token, data);
          reset();
          event!.target!.reset();
        }
        else{
          const partialRequest:iEditRequest = {
            username: data.username,
            avatar:data.avatar
          }
          edit(user!.id,token, partialRequest)
        }
      })}
    >
      <h2>Atualizar Perfil</h2>
      <Controller
        control={control}
        name="username"
        defaultValue={user ? user.username : "sem usuário logado"}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { isTouched, isDirty, error },
          formState,
        }) => (
          <Input
            isDirty={isDirty}
            isValid={error ? false : true}
            type="text"
            placeholder="Digite seu nome de usuário"
            onChange={onChange}
            value={value}
          />
        )}
      />
      {<p className="errorMessage">{errors.username?.message}</p>}

      <div className="passwordWrapper">
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { isTouched, isDirty, error },
            formState,
          }) => (
            <Input
              isDirty={isDirty}
              isValid={error ? false : true}
              type={showPass ? "text" : "password"}
              placeholder="digite uma nova senha"
              onChange={onChange}
              value={value}
            />
          )}
        />
        {<p className="errorMessage">{errors.password?.message}</p>}
        <button
          type="button"
          onClick={() => toggleShowPass(!showPass)}
          className="passToggle"
        >
          {showPass ? (
            <VisibilityOffIcon sx={{ color: "grey" }} />
          ) : (
            <VisibilityIcon sx={{ color: "grey" }} />
          )}{" "}
        </button>
      </div>
      <div className="passwordWrapper">
        <Controller
          control={control}
          name="passwordConfirm"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { isTouched, isDirty, error },
            formState,
          }) => (
            <Input
              isDirty={isDirty}
              isValid={error ? false : true}
              type={showPass ? "text" : "password"}
              placeholder="Confirme sua nova senha"
              onChange={onChange}
              value={value}
            />
          )}
        />
        {<p className="errorMessage">{errors.passwordConfirm?.message}</p>}
        <Controller
          control={control}
          name="avatar"
          defaultValue={user ? user.avatar : "sem usuário logado"}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { isTouched, isDirty, error },
            formState,
          }) => (
            <Input
              isDirty={isDirty}
              isValid={error ? false : true}
              type="text"
              placeholder="Link avatar"
              onChange={onChange}
              value={value}
            />
          )}
        />
        {<p className="errorMessage">{errors.avatar?.message}</p>}
        <button
          type="button"
          onClick={() => toggleShowPass(!showPass)}
          className="passToggle"
        >
          {showPass ? (
            <VisibilityOffIcon sx={{ color: "grey" }} />
          ) : (
            <VisibilityIcon sx={{ color: "grey" }} />
          )}{" "}
        </button>
      </div>

      <button
        disabled={!isValid || loading || user === undefined}
        type="submit"
      >
        {loading ? <PulseLoader /> : "Cadastrar"}
      </button>
    </LoginFormComp>
  );
};

export default EditForm;
