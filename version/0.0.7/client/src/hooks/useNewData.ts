// - Path: "TeaChoco-Hospital/client/src/hooks/useNewData.ts"
import { useMemo } from 'react';
import type { ApiData, OutApiData } from '../types/types';
import { useAuth } from './useAuth';

export const useUpdateData = <Data extends ApiData<object>>(data: Data): OutApiData<Data> => {
    const { user } = useAuth();
    return useMemo(() => ({ ...data, user_id: user?.user_id }), [user]);
};
