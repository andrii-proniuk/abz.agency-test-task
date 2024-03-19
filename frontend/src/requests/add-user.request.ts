import { IAddUserFormData } from '../components/AddUserForm';
import { BACKEND_URL } from '../environment';

const TOKEN_KEY = 'token';

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const getToken = async (): Promise<string> => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    return token;
  }

  const response = await fetch(`${BACKEND_URL}/token`);

  const result = await response.json();

  if (response.status !== 200) {
    throw new Error('Error while getting token');
  }

  localStorage.setItem(TOKEN_KEY, result.token);

  return result.token;
};

const sendRequest = async (token: string, formData: FormData): Promise<boolean> => {
  const response = await fetch(`${BACKEND_URL}/users`, {
    method: 'POST',
    body: formData,
    headers: {
      token,
    },
  });

  const result = await response.json();

  if (response.status === 401) {
    return false;
  }

  if (response.status !== 201) {
    throw new Error(result?.message || 'Error while saving user');
  }

  return true;
};

export const saveUser = async (addUserData: IAddUserFormData): Promise<void> => {
  let token = await getToken();

  const formData = new FormData();
  
  Object.entries(addUserData).forEach(([field, value]) => {
    formData.append(field, value);
  });

  const result = await sendRequest(token, formData);

  if (result) {
    return;
  }

  removeTokenFromLocalStorage();

  token = await getToken();

  await sendRequest(token, formData);
};
