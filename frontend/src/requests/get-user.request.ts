import { BACKEND_URL } from '../environment';
import { UserResponseDto } from '../response-dto/user.response-dto';

export const getUserRequest = async (userId: number): Promise<UserResponseDto> => {
  const response = await fetch(`${BACKEND_URL}/users/${userId}`);

  const result = await response.json();

  if (response.status !== 200) {
    throw new Error(result?.message || 'Error while loading user info');
  }

  return result.user;
};
