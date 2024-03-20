import { BACKEND_URL } from '../environment';

export const runSeederRequest = async (): Promise<boolean> => {
  const response = await fetch(`${BACKEND_URL}/seeder`);

  return response.ok;
}
