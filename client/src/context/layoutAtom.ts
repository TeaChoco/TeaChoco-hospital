// Path: "TeaChoco-Hospital/client/src/context/layoutAtom.ts"
import { atomWithStorage } from 'jotai/utils';

export interface DetailLayout {
    isJson: boolean;
    editJson: boolean;
}

export const detailLayoutAtom = atomWithStorage<DetailLayout>('detailLayout', {
    isJson: false,
    editJson: false,
});
