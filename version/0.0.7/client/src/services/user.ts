//-Path: "TeaChoco-Hospital/client/src/services/user.ts"
import serverRest, { queryToString } from './axios';
import type { User, UserQuery } from '../types/auth';

export const userAPI = {
    findAll: (query?: UserQuery) =>
        serverRest.get<User[]>(`/user${queryToString<UserQuery>(query)}`),
    userId: (id: string, query?: UserQuery) =>
        serverRest.get<User>(`/user/id/${id}${queryToString<UserQuery>(query)}`),
    update: (id: string, user: Partial<User>) => serverRest.put(`/user/id/${id}`, user),
    remove: (id: string) => serverRest.delete(`/user/id/${id}`),
};
