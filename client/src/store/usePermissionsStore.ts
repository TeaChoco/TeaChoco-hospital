// - Path: "TeaChoco-Hospital/client/src/store/usePermissionsStore.ts"
import { create } from 'zustand';
import { type Allow, Resource } from '../types/auth';

export type PermissionMatrix = Record<Resource, Allow>;

interface PermissionsState {
    permissions: PermissionMatrix;
    setPermissions: (permissions: PermissionMatrix) => void;
    updatePermission: (resource: Resource, allow: Allow) => void;
}

export const usePermissionsStore = create<PermissionsState>((set) => ({
    permissions: {
        [Resource.AUTH]: { edit: true, read: true },
        [Resource.DOCTORS]: { edit: true, read: true },
        [Resource.HOSPITALS]: { edit: true, read: true },
        [Resource.MEDICINES]: { edit: true, read: true },
        [Resource.CALENDARS]: { edit: true, read: true },
        [Resource.APPOINTMENTS]: { edit: true, read: true },
    },
    setPermissions: (permissions) => set({ permissions }),
    updatePermission: (resource, allow) =>
        set((state) => ({ ...state, permissions: { ...state.permissions, [resource]: allow } })),
}));
