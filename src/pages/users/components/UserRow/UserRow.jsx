/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useServerRequest } from '../../../../hooks';

export const UserRow = ({
  id,
  login,
  registeredAt,
  roleId: userRoleId,
  roles,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(userRoleId);
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
  const requestServer = useServerRequest();

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const onRoleSave = (userId, newUserRoleId) => {
    requestServer('updateUserRole', userId, newUserRoleId).then(() => {
      setInitialRoleId(newUserRoleId);
    });
  };

  const isRoleChanged = selectedRoleId !== initialRoleId;

  return (
    <div className="table-row">
      <div className="user-data-row">
        <div className="login-column">{login}</div>
        <div className="registered-at-column">{registeredAt}</div>
        <div className="role-column">
          <select
            value={selectedRoleId}
            onChange={onRoleChange}
            className="role-selector"
          >
            {roles.map(({ id: roleId, name: roleName }) => (
              <option key={roleId} value={roleId}>
                {roleName}
              </option>
            ))}
          </select>
        </div>
        <i
          className={
            isRoleChanged
              ? 'fa fa-floppy-o fa-lg pt-[5px] w-[30px] cursor-pointer'
              : 'fa fa-floppy-o fa-lg pt-[5px] w-[30px] cursor-pointer text-gray-400 disabled'
          }
          aria-hidden="true"
          onClick={() => onRoleSave(id, selectedRoleId)}
        />
        <i
          className="fa fa-trash-o fa-lg cursor-pointer pr-[5px] pt-[5px]"
          aria-hidden="true"
          onClick={onUserRemove}
        />
      </div>
    </div>
  );
};
