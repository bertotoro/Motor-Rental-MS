import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, updateUserRole, updateUserPassword, updateUserCredentials } from '../redux/actions/userActions';
import Spinner from '../components/Spinner';
import DefaultLayout from '../components/DefaultLayout';
import { Table, Button, Modal, Input, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Column } = Table;

function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.usersReducer);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentRole, setCurrentRole] = useState('user'); // Initialize current role as 'user'

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
    message.success('User deleted successfully');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUsername(user.username);
    setNewPassword(user.password); // Display password in the input field
    setCurrentRole(user.role); // Set current role
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    // Dispatch action to update user information
    if (!selectedUser) return; // Return if no user is selected

    const { _id } = selectedUser; // Get the user ID

    // Check if new username or password is different from the current one
    const usernameChanged = newUsername !== selectedUser.username;
    const passwordChanged = newPassword !== selectedUser.password;

    // If username or password changed, dispatch actions to update them
    if (usernameChanged || passwordChanged) {
      // Dispatch action to update username and password
      dispatch(updateUserCredentials(_id, newUsername, newPassword));
    }

    // Dispatch action to update user role
    dispatch(updateUserRole(_id, currentRole));

    message.success('User information updated successfully');
    setEditModalVisible(false);
  };

  const handleUpdateRole = (userId) => {
    // Toggle between 'user' and 'admin' roles
    const newRole = currentRole === 'user' ? 'admin' : 'user';
    setCurrentRole(newRole); // Update current role in state
    dispatch(updateUserRole(userId, newRole));
    message.success(`User role updated to ${newRole} successfully`);
  };

  return (
    <DefaultLayout>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '80%' }}>
            <h1 className="text-center">User List</h1>
            <Table dataSource={users} pagination={false}>
              <Column
                title="#"
                key="index"
                render={(text, record, index) => index + 1}
              />
              <Column title="Username" dataIndex="username" key="username" />
              <Column title="Password" dataIndex="password" key="password" />
              <Column
                title="Role"
                key="role"
                render={(text, record) => (
                  <span>
                    {record.role}
                    <Button type="link" onClick={() => handleUpdateRole(record._id)}>
                      Update Role
                    </Button>
                  </span>
                )}
              />
              <Column
                title="Actions"
                key="actions"
                render={(text, record) => (
                  <span>
                    <Button type="link" onClick={() => handleDeleteUser(record._id)} icon={<DeleteOutlined />} />
                    <Button type="link" onClick={() => handleEditUser(record)} icon={<EditOutlined />} />
                  </span>
                )}
              />
            </Table>
            <Modal
              title="Edit User"
              visible={editModalVisible}
              onOk={handleSaveEdit}
              onCancel={() => setEditModalVisible(false)}
            >
              <Input
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <Input.Password
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Modal>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default UserList;
