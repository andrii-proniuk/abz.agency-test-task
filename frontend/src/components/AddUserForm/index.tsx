import React, { useEffect, useRef, useState } from 'react';
import { saveUser } from '../../requests/add-user.request';

import './styles.css';
import { PositionResponseDto } from '../../response-dto/position.response-dto';
import { getPositionsRequest } from '../../requests/get-positions.request';
import { USER_PHOTO_MAX_SIZE } from '../../constants';

export interface IAddUserFormData {
  name: string;
  email: string;
  phone: string;
  position_id?: number;
  photo?: File | null;
}

function AddUserForm() {
  const [formData, setFormData] = useState<IAddUserFormData>({
    name: '',
    email: '',
    phone: '',
    photo: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | string[]>();
  const [positions, setPositions] = useState<PositionResponseDto[]>();

  const photoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    getPositionsRequest().then((result) => {
      setPositions(result.positions);
      setFormData((prev) => ({ ...prev, position_id: result.positions[0].id }));
    }).catch((error) => setError(error?.message || 'Error while loading positions'));

    return () => {
      controller.abort();
    }
  }, []);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    saveUser({ ...formData, position_id: Number(formData.position_id) })
      .then(() => {
        if (photoRef.current) {
          photoRef.current.value = '';
        }

        alert('User successfully added');
      })
      .catch((error) => {
        setError(error?.message);
      })
      .finally(() => setLoading(false));
  }

  const onChangeComposer = (field: keyof IAddUserFormData): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value || '' }));
    };
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);

    if (file?.size && file.size > USER_PHOTO_MAX_SIZE) {
      alert('Photo too large, max size - 5MB');

      setFormData((prev) => ({
        ...prev,
        photo: null,
      }));

      e.target.value = '';

      return;
    }
    
    setFormData(
      (prev) => ({
        ...prev,
        photo: file,
      }),
    )
  };

  return (
    <form className='add-user-form' onSubmit={ onFormSubmit }>
      <h1>Add user form</h1>
      { error && <p className='add-user-form-error'>Error: { error }</p>}
      <input
        disabled={ loading }
        className='add-user-form-name'
        value={ formData.name || '' }
        onChange={ onChangeComposer('name') }
        name='name'
        placeholder='Name'
        type='text'
      />
      <select
        disabled={ loading }
        className='add-user-form-position'
        value={ (formData.position_id && String(formData.position_id)) || undefined }
        onChange={ (e) => setFormData((prev) => ({ ...prev, position_id: Number(e.target.value) })) }
      >
        { positions?.map(({ id, name }) => <option key={ id } value={ id }>{ name }</option>) }
      </select>
      <input
        disabled={ loading }
        className='add-user-form-email'
        value={ formData.email || '' }
        onChange={ onChangeComposer('email') }
        name='email'
        placeholder='Email'
        type='text'
      />
      <input
        disabled={ loading }
        className='add-user-form-phone'
        value={ formData.phone || '' }
        onChange={ onChangeComposer('phone') }
        name='phone'
        placeholder='Phone'
        type='text'
      />
      <input
        ref={ photoRef }
        disabled={ loading }
        className='add-user-form-photo'
        accept='image/jpeg'
        name='photo'
        placeholder='Photo'
        type='file'
        onChange={
          (e) => onSelectFile(e)
        }
      />
      <button disabled={ loading } type='submit'>{ !loading ? 'Save' : 'Saving...' }</button>
    </form>
  )
}

export default AddUserForm;
