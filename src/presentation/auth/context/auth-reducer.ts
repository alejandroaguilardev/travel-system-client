import { ActionMapType, AuthStateType, AuthUserType, Types } from "../types";


type Payload = {
    [Types.INITIAL]: {
        user: AuthUserType;
    };
    [Types.LOGIN]: {
        user: AuthUserType;
    };
    [Types.UPDATE]: {
        user: AuthUserType;
    };
    [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];



export const AuthReducer = (state: AuthStateType, action: ActionsType) => {
    if (action.type === Types.INITIAL) {
        return {
            authenticated: !!action.payload.user,
            loading: false,
            user: action.payload.user,
        };
    }
    if (action.type === Types.LOGIN) {
        return {
            ...state,
            authenticated: !!action.payload.user,
            user: action.payload.user,
        };
    }
    if (action.type === Types.UPDATE) {
        return {
            ...state,
            authenticated: !!action.payload.user,
            user: action.payload.user,
        };
    }
    if (action.type === Types.LOGOUT) {
        return {
            ...state,
            authenticated: false,
            user: null,
        };
    }
    return state;
};

