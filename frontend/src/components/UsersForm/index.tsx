import { useEffect, useRef, useState } from 'react';
import { GetUsersResponseDto } from '../../response-dto/get-users.response-dto';

import './styles.css';
import { getUsersRequest } from '../../requests/get-users.request';
import UserProfileModal from '../UserProfileModal';

interface IFormData {
  loading?: boolean;
  error?: string;
  response?: GetUsersResponseDto;
}


function UsersForm() {
  const [formData, setFormData] = useState<IFormData>();
  const [currentLink, setCurrentLink] = useState<string | null>(null);
  const [userId, setUserId] = useState<number>();
  
  const profileModalRef = useRef<HTMLDialogElement>(null);

  const openProfileModal = (userId: number) => {
    profileModalRef.current?.showModal();
    setUserId(userId);
  }

  useEffect(() => {
    const controller = new AbortController();

    getUsersRequest(currentLink)
      .then((response) => {
        setFormData((prev) => ({ ...prev, response, loading: false  }))
      })
      .catch((error) => {
        setFormData((prev) => ({ ...prev, error: error?.message, loading: false }))
      });

    return () => {
      controller.abort();
    }
  }, [currentLink]);

  const getContent = () => {
    if (formData?.loading) {
      return <p>Loading positions...</p>;
    }

    if (formData?.error) {
      return <p>Error: {formData.error}</p>
    }

    if (!formData?.response?.users?.length) {
      return <p>Users not found</p>
    }

    const { prev_url, next_url } = formData.response.links;

    return (
      <>
        <p>Found users:</p>
        <ul className="users-list">
          {
            formData.response?.users.map(
              ({ id, name, email, phone, photo }) =>
                <li className='users-list-item' key={id} onClick={ () => openProfileModal(id) }>
                  <img className='users-list-item-avatar' src={photo} alt='avatar' />
                  <div className='users-list-item-info'>
                    <p className='users-list-item-name'>{ name }</p>
                    <p className='users-list-item-email'>{ email }</p>
                  </div>
                </li>
              )
          }
        </ul>
        <div className="form-controls">
          <button className='form-controls-button' disabled={!prev_url} onClick={() => prev_url && setCurrentLink(prev_url) }>Previous page</button>
          <p>Page {formData.response.page} of {formData.response.total_pages} </p>
          <button className='form-controls-button' disabled={!next_url} onClick={() => next_url && setCurrentLink(next_url) }>Next page</button>
        </div>
        <UserProfileModal userId={ userId } />
      </>
    )
  };

  return (
    <>
      { getContent() }
    </>
  );
}

export default UsersForm;
