//-Path: "TeaChoco-Hospital/client/src/services/user.ts"
import serverRest, { queryToString } from './axios';
import type { User, UserQuery } from '../types/auth';

export const userAPI = {
    user: (query?: UserQuery) => serverRest.get(`/user${queryToString<UserQuery>(query)}}`),
    userId: (id: string, query?: UserQuery) =>
        serverRest.get(`/user/id/${id}${queryToString<UserQuery>(query)}`),
    update: (id: string, user: Partial<User>) => serverRest.put(`/user/id/${id}`, user),
    remove: (id: string) => serverRest.delete(`/user/id/${id}`),
};
