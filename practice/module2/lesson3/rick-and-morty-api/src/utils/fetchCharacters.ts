import { DefaultApi } from '../api/api-client-generated/apis/DefaultApi';
import type { CharacterListResponse } from '../api/api-client-generated/models/CharacterListResponse';

export const fetchCharacters = async (): Promise<CharacterListResponse | null> => {
  try {
    return await new DefaultApi().getCharacters();
  } catch (error) {
    console.error('Error fetching characters:', error);
    return null;
  }
};
