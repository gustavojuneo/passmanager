import { useContext } from 'react';
import { StorageContext } from '../StorageContext';

export const useStorageData = () => {
  return useContext(StorageContext);
};
