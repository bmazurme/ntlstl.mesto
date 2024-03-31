/* eslint-disable no-undef */
import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import { Urls } from '../../utils/constants';
import Modal from '../../components/modal';
import EditProfile from '../../components/profile/components/edit-profile';

import { useUpdateUserMutation } from '../../store';
import useUser from '../../hooks/use-user';

export default function UserLayout() {
  const errorHandler = useErrorHandler();
  const user = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [updateUser, { isLoading: isLoadingUser }] = useUpdateUserMutation();

  const handleClose = useCallback(() => {
    navigate(`${Urls.USERS.INDEX}/${user?.id}`);
  }, [location.state, navigate]);
  const handleUpdateUserSubmit = async (data: Record<string, string>) => {
    try {
      await updateUser(data);
      handleClose();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <Modal
      onClose={handleClose}
      children={(
        <EditProfile
          isLoading={isLoadingUser}
          info={user}
          onUpdateUser={handleUpdateUserSubmit}
        />
      )}
    />
  );
}