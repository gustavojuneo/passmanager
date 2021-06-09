import React, { createContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

export type LoginListDataProps = LoginDataProps[];

interface StorageProviderProps {
  children: ReactNode;
}

interface IStorageContextData {
  getStorageData: () => Promise<LoginListDataProps>;
  registerStorageData: (formData: any) => Promise<void>;
}

export const StorageContext = createContext({} as IStorageContextData);
const dataKey = '@passmanager:logins';

export function StorageProvider({ children }: StorageProviderProps) {
  async function getStorageData() {
    // Get asyncStorage data, use setSearchListData and setData
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    return responseFormatted;
  }

  async function registerStorageData(formData: any) {
    const newLoginData = {
      id: String(uuid.v4()),
      ...formData,
    };
    const data = await AsyncStorage.getItem(dataKey);
    const currentData = data ? JSON.parse(data) : [];
    const formattedData = [...currentData, newLoginData];
    await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));
  }

  return (
    <StorageContext.Provider value={{ getStorageData, registerStorageData }}>
      {children}
    </StorageContext.Provider>
  );
}
