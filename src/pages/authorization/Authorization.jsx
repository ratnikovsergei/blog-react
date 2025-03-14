import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { H2, Input, Button, AuthFormError } from '../../ui';
import { useResetForm } from '../../hooks';
import { server } from '../../bff';
import { setUser } from '../../store/actions';
import { selectUserRole } from '../../store/selectors';
import { ROLE } from '../../constants';

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required('Заполните поле логин')
    .matches(/^\w+$/, 'Неверно заполнен логин. Допукаются только буквы и цифры')
    .min(3, 'Неверно заполнен логин. Миниммум 3 символа')
    .max(15, 'Неверно заполнен логин. Максимум 15 символов'),
  password: yup
    .string()
    .required('Впишите пожалуйста пароль')
    .matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %')
    .min(6, 'Длина пароля должна быть не менее 6 символов')
    .max(30, 'Длина пароля не должна превышать 30 символов'),
});

export const Authorization = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    server.authorize(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(`Ошибка: ${error}`);
        return;
      }
      dispatch(setUser(res));
      sessionStorage.setItem('userData', JSON.stringify(res));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className="authform">
      <H2>Авторизация</H2>
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
        <Button type="submit" disabled={!!formError}>
          Авторизоваться
        </Button>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
        <Link to="/register" className="mt-5 text-center">
          Регистрация
        </Link>
      </form>
    </div>
  );
};
