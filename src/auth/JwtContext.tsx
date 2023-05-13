import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
// utils
import useSWR from 'swr';
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { ActionMapType, AuthStateType, JWTContextType, UserCreate } from './types';
import { setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  VERIFY = 'VERIFY',
  PAID = 'PAID',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: UserCreate;
  };
  [Types.LOGIN]: {
    user: UserCreate;
  };
  [Types.REGISTER]: {
    user: UserCreate;
  };
  [Types.VERIFY]: {
    emailVerified: boolean;
  };
  [Types.LOGOUT]: undefined;
  [Types.PAID]: {
    paymentSuccess: boolean;
    txnId: number;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  paymentSuccess: false,
  txnId: null,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      paymentSuccess: false,
      txnId: null,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  if (action.type === Types.PAID) {
    return {
      ...state,
      paymentSuccess: true,
      txnId: action.payload.txnId,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(
    async (url: string) => {
      try {
        const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

        if (accessToken) {
          setSession(accessToken);

          const response = await axios.get(url);

          const user = response.data;

          // @ts-ignore
          dispatch({
            type: Types.INITIAL,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          // @ts-ignore
          dispatch({
            type: Types.INITIAL,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        console.error(error);
        // @ts-ignore
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    },
    [storageAvailable]
  );

  const { mutate: revalidateUser } = useSWR('/users', initialize, {
    refreshInterval: 1000000,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    initialize('/users');
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const res = await axios.post('/users/login', { email, password });
    const { accessToken, user } = res.data;

    setSession(accessToken);

    // @ts-ignore
    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (data: UserCreate) => {
    const res = await axios.post('/users/signup', data);
    const { accessToken, user } = res.data;

    setSession(accessToken);

    // @ts-ignore
    dispatch({
      type: Types.REGISTER,
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    // @ts-ignore
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // LOGIN
  const onPaymentSuccess = useCallback((txnId: number) => {
    // @ts-ignore
    dispatch({
      type: Types.PAID,
      txnId,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      paymentSuccess: state.paymentSuccess,
      user: state.user,
      txnId: state.txnId,
      method: 'jwt',
      login,
      loginWithGoogle: () => {},
      loginWithGithub: () => {},
      loginWithTwitter: () => {},
      register,
      logout,
      revalidateUser,
      onPaymentSuccess,
    }),
    [
      state.txnId,
      state.isAuthenticated,
      state.isInitialized,
      state.paymentSuccess,
      state.user,
      login,
      logout,
      register,
      revalidateUser,
      onPaymentSuccess,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
