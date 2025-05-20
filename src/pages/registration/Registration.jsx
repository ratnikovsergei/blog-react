import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { H2, Input, Button, AuthFormError } from '../../ui';
import { useResetForm } from '../../hooks';
import { setUser } from '../../store/actions';
import { selectUserRole } from '../../store/selectors';
import { ROLE } from '../../constants';
import { request } from '../../utils/request';

const regFormSchema = yup.object().shape({
  login: yup
    .string()
    .required('Заполните поле логин')
    .matches(/^\w+$/, 'Неверно заполнен логин. Допукаются только буквы и цифры')
    .min(3, 'Неверно заполнен логин. Миниммум 3 символа')
    .max(15, 'Неверно заполнен логин. Максимум 15 символов'),
  password: yup
    .string()
    .required('Придумайте пароль')
    .matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %')
    .min(6, 'Длина пароля должна быть не менее 6 символов')
    .max(30, 'Длина пароля не должна превышать 30 символов'),
  passcheck: yup
    .string()
    .required('Повторите пароль')
    .oneOf([yup.ref('password'), null], 'Введенные пароли не совпадают'),
});

export const Registration = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
      passcheck: '',
    },
    resolver: yupResolver(regFormSchema),
  });

  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    request('/api/register', 'POST', { login, password }).then(({ error, user }) => {
      if (error) {
        setServerError(`Ошибка: ${error}`);
        return;
      }
      dispatch(setUser(user));
      sessionStorage.setItem('userData', JSON.stringify(user));
    });
  };

  const formError =
    errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className="authform">
      <H2>Регистрация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин..."
          {...register('login', { onChange: () => setServerError(null) })}
        />
        <Input
          type="password"
          placeholder="Пароль..."
          {...register('password', { onChange: () => setServerError(null) })}
        />
        <Input
          type="password"
          placeholder="Подтвердите пароль..."
          {...register('passcheck', { onChange: () => setServerError(null) })}
        />
        <Button type="submit" disabled={!!formError}>
          Зарегистрироваться
        </Button>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
      </form>
    </div>
  );
};
