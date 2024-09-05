import { DefaultApi } from '../api/apis/DefaultApi';
import type { CharacterListResponse } from '../api/models/CharacterListResponse';

export const fetchCharacters = async (): Promise<CharacterListResponse | null> => {
  try {
    return await new DefaultApi().getCharacters();
  } catch (error) {
    console.error('Error fetching characters:', error);
    return null;
  }
};
