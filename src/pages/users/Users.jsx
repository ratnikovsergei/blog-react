import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ROLE } from '../../constants';
import { UserRow } from './components';
import { PrivateContent } from '../../components';
import { useServerRequest } from '../../hooks';
import { selectUserRole } from '../../store/selectors';
import { checkAccess } from '../../utils';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, seterrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
  const userRole = useSelector(selectUserRole);

  const requestServer = useServerRequest();

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
      ([usersres, rolesres]) => {
        if (usersres.error || rolesres.error) {
          seterrorMessage(usersres.error || rolesres.error);
          return;
        }

        setUsers(usersres.res);
        setRoles(rolesres.res);
      }
    );
  }, [requestServer, shouldUpdateUserList, userRole]);

  const onUserRemove = (userId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    requestServer('removeUser', userId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <div>
      <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
        <div className="text-center text-2xl font-semibold mb-5">Пользователи</div>
        <div className="users-table-container">
          <div className="users-table-header">
            <div className="login-column">Логин</div>
            <div className="registered-at-column">Дата регистрации</div>
            <div className="role-column">Роль</div>
          </div>
          {users.map(({ id, login, registeredAt, roleId }) => (
            <UserRow
              key={id}
              id={id}
              login={login}
              registeredAt={registeredAt}
              roleId={roleId}
              roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
              onUserRemove={() => onUserRemove(id)}
            />
          ))}
        </div>
      </PrivateContent>
    </div>
  );
};
