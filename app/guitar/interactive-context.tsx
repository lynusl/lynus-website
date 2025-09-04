import { ActionDispatch, createContext } from "react";
import { Fret, Note, PitchClass } from "../utils/guitar/constants";

export type SelectedFretsState = (Fret | null)[]
export type HighlightedPitchClassesState = (PitchClass)[]

export const SelectedFretsContext = createContext<SelectedFretsState>([null, null, null, null, null, null]);
export const SelectedFretsDispatchContext = createContext<ActionDispatch<[action: FretboardAction]>>(() => {});

export const HighlightedPitchClassesContext = createContext<HighlightedPitchClassesState>([]);
export const HighlightedPitchClassesDispatchContext = createContext<ActionDispatch<[action: HighlightedPitchClassesAction]>>(() => {});


export enum FretboardActionType {
    CLEAR,
    CHANGE_STRING,
    SET
}

export enum HighlightedPitchClassesActionType {
    SET,
    TOGGLE
}

export type FretboardAction = { actionType: FretboardActionType.CLEAR; } |
{ actionType: FretboardActionType.CHANGE_STRING; stringId: number; newFret: Fret | null; } |
{ actionType: FretboardActionType.SET; newFrets: SelectedFretsState; };

export type HighlightedPitchClassesAction = 
| { actionType : HighlightedPitchClassesActionType.SET; newState : HighlightedPitchClassesState; }
|  {actionType : HighlightedPitchClassesActionType.TOGGLE; toggledPitchClass : PitchClass; };


export function fretboardReducer(state: SelectedFretsState, action: FretboardAction) {
    switch (action.actionType) {
        case FretboardActionType.CLEAR:
            return state.map((_) => { return null; });
        case FretboardActionType.CHANGE_STRING:
            return state.map((s, idx) => (action.stringId == idx) ? action.newFret : s);
        case FretboardActionType.SET:
            return action.newFrets;
    }
}


export function highlightedPitchClassesReducer(state: HighlightedPitchClassesState, action: HighlightedPitchClassesAction) {
    switch (action.actionType) {
        case HighlightedPitchClassesActionType.SET:
            return action.newState;
        case HighlightedPitchClassesActionType.TOGGLE:
            if (state.includes(action.toggledPitchClass)) {
                return state.filter((v) => v != action.toggledPitchClass);
            } else {
                return [...state, action.toggledPitchClass];
            }
    }
}
