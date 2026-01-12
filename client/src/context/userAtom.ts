//-Path: "TeaChoco-Hospital/client/src/context/userAtom.ts"
import { atom } from 'jotai';
import type { User } from '../types/auth';

export const userAtom = atom<User | null | undefined>(undefined);

export const loadingUserAtom = atom<boolean>(true);

export const errorUserAtom = atom<string | null>(null);
