import { useEffect, useState } from 'react';
import { H2 } from '../../ui';
import { UserRow } from './components';
import { Content } from '../../components';
import { useServerRequest } from '../../hooks';
import { ROLE } from '../../constants';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, seterrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

  const requestServer = useServerRequest();

  useEffect(() => {
    Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
      ([usersResponse, rolesResponse]) => {
        if (usersResponse.error || rolesResponse.error) {
          seterrorMessage(usersResponse.error || rolesResponse.error);
          return;
        }

        setUsers(usersResponse.response);
        setRoles(rolesResponse.response);
      }
    );
  }, [requestServer, shouldUpdateUserList]);

  const onUserRemove = (userId) => {
    requestServer('removeUser', userId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <div>
      <Content error={errorMessage}>
        <H2>Пользователи</H2>
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
      </Content>
    </div>
  );
};
