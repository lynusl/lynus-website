import { ActionDispatch, createContext } from "react";
import { Fret, Note } from "../utils/guitar/constants";

export type SelectedFretState = (Fret | null)[]

export const SelectedFretsContext = createContext<SelectedFretState>([null, null, null, null, null, null]);
export const SelectedFretsDispatchContext = createContext<ActionDispatch<[action: fretboardAction]>>(() => {});


export enum fretboardActionType {
    CLEAR,
    CHANGE_STRING,
    SET
}

export type fretboardAction = { actionType: fretboardActionType.CLEAR; } |
{ actionType: fretboardActionType.CHANGE_STRING; stringId: number; newFret: Fret | null; } |
{ actionType: fretboardActionType.SET; newFrets: SelectedFretState; };

export function fretboardReducer(state: SelectedFretState, action: fretboardAction) {
    switch (action.actionType) {
        case fretboardActionType.CLEAR:
            return state.map((_) => { return null; });
        case fretboardActionType.CHANGE_STRING:
            return state.map((s, idx) => (action.stringId == idx) ? action.newFret : s);
        case fretboardActionType.SET:
            return action.newFrets;
    }
}

