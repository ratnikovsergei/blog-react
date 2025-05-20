import { useState } from 'react';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../../constants';
import { request } from '../../../../utils/request';

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

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const onRoleSave = (userId, newUserRoleId) => {
    request(`/api/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
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

UserRow.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  registeredAt: PropTypes.string.isRequired,
  roleId: PROP_TYPE.ROLE.isRequired,
  roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
  onUserRemove: PropTypes.func.isRequired,
};
