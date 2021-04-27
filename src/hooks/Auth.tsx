// export const auth = () => {
//     const user = localStorage.getItem('@user')
//     if (!user)
//         return false

//     return true
// }

// export const signOut = () => {
//     return localStorage.removeItem('@user');
// }
import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../server/api';

interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@TGL:token');
    const user = localStorage.getItem('@TGL:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    // console.log(token.token);
    // console.log(response.data);
    localStorage.setItem('@TGL:token', token.token);
    localStorage.setItem('@TGL:user', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token.token}`;
    // api.defaults.headers = `Bearer ${token.token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@TGL:token');
    localStorage.removeItem('@TGL:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@TGL:user', JSON.stringify(user));
      setData({
        token: data.token,
        user: user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an  AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
