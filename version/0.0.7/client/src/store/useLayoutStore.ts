//-Path: "TeaChoco-Hospital/client/src/store/useLayoutStore.ts"
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DetailLayout {
    isJson: boolean;
    editJson: boolean;
}

interface LayoutState {
    detailLayout: DetailLayout;
    setDetailLayout: (layout: DetailLayout) => void;
}

export const useLayoutStore = create<LayoutState>()(
    persist(
        (set) => ({
            detailLayout: {
                isJson: false,
                editJson: false,
            },
            setDetailLayout: (layout) => set({ detailLayout: layout }),
        }),
        {
            name: 'detailLayout',
        },
    ),
);
