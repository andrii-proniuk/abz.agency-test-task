import { BACKEND_URL } from '../environment';
import { GetUsersResponseDto } from '../response-dto/get-users.response-dto';

export const getUsersRequest = async (link: string | null): Promise<GetUsersResponseDto> => {
  const response = await fetch(link || `${BACKEND_URL}/users`);

  const body = await response.json();

  if (response.status !== 200) {
    throw new Error(body?.message || 'Error while fetching users');
  }

  return body;
};
