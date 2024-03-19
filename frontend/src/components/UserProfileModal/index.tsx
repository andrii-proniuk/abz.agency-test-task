import { useEffect, useRef, useState } from 'react';
import { UserResponseDto } from '../../response-dto/user.response-dto';
import { getUserRequest } from '../../requests/get-user.request';

interface Props {
  userId?: number;
}

function UserProfileModal({ userId }: Props) {
  const [userData, setUserData] = useState<UserResponseDto>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const controller = new AbortController();

    ref.current?.showModal();

    getUserRequest(userId)
      .then(setUserData)
      .catch((error) => {
        setError(error?.message);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [userId]);

  const getContent = () => {
    if (loading) {
      return <p>Loading...</p>
    }

    if (error) {
      return <p className='user-profile-error'>{ error }</p>
    }

    if (!userData) {
      return <p className='user-profile-error'>User not found</p>
    }

    return (
      <>
        <img src={ userData.photo } alt="User avatar" />
        <div className='user-profile-info'>
          <p className='user-profile-name'>{ userData.name }</p>
          <p className='user-profile-position'>{ userData.position }</p>
          <div className='user-profile-contacts'>
            <p className='user-profile-email'>Email: { userData.email }</p>
            <p className='user-profile-phone'>Phone: { userData.phone }</p>
          </div>
        </div>
      </>
    )
  };

  return <>
    <dialog ref={ ref }>
      { getContent() }
      <button onClick={ () => ref.current?.close() }>Close</button>
    </dialog>
  </>
}

export default UserProfileModal;
