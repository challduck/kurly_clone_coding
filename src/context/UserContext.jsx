import React, { createContext, useContext, useReducer } from 'react';

// 초기 상태
const initialState = {
    isAuthenticated: false,
    user: null,
};

// 액션 타입 정의
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// 리듀서 함수
const userReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

// Context 생성
const UserContext = createContext();

// Context의 Provider 컴포넌트
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

// 커스텀 훅
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
