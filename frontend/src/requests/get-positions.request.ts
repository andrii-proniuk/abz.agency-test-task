import { BACKEND_URL } from '../environment';
import { GetPositionsResponseDto } from '../response-dto/get-positions.response-dto';

export const getPositionsRequest = async (): Promise<GetPositionsResponseDto> => {
  const response = await fetch(`${BACKEND_URL}/positions`);

  const result = await response.json();

  if (response.status !== 200) {
    throw new Error(result?.message || 'Error while fetching positions');
  }

  return result;
};
