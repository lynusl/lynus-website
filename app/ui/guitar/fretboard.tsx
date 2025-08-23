'use client'
import { ActionDispatch, createContext, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { Fret, Note } from '@/app/utils/guitar/constants';

import { SelectedScaleContext } from '@/app/guitar/interactive';
import { PitchClass } from '@/app/utils/guitar/constants';
import { getNotesForString, getScale } from '@/app/guitar/client-actions';
import { fretboardAction, fretboardActionType, SelectedFretsDispatchContext, SelectedFretState } from "@/app/guitar/interactive-context";


// const HeaderFret = ({ note, } : {note:string}) => {
//     return <CellComponent note={note} active={true}/>
// }

const CellComponent = ({ note, active, action } : {note: Note; active?:boolean; action: () => void}) => {
    const {scaleId: scaleState, setScaleId: setButtonId} = useContext(SelectedScaleContext);

    const notes = getScale(scaleState.tonic, "MAJOR_TRIAD")

    return(
        <button 
            onClick={action}
            className={clsx(
            "basis-full grow-0 text-center align-middle transition-colors first:border-b-4 first:border-amber-400", 
            {
                // tone is in the scale
                'bg-gray-700' : scaleState.tonic != note.pitchClass && notes && notes.includes(note.pitchClass),

                // tone is the root of the scale
                'bg-blue-900' : scaleState.tonic === note.pitchClass,
            }, 
            {
                // selected
                'text-amber-700 font-bold text-xl' : active,

                // not selected
                'text-base first:text-amber-300' : !active,

            }
        )}
        >
            {note.pitchClassStr}
        </button>
    )
}


const StringComponent = (
    { rows, firstNote, selectedFret, action } : 
    {rows: number; firstNote: Note; selectedFret: Fret | null; action: (newFret: Fret | null) => void}
) => {
    
    // function handleItemClick(stringId: number, newNote: Note) {
    //     console.log(stringId)
    //     action({actionType: fretboardActionType.CHANGE_STRING, stringId: stringId, newNote: newNote})
    // }

        
    return(
        <div className="basis-full grow-0 h-full flex flex-col place-items-stretch">
            {
                getNotesForString(firstNote, rows).map((note, idx) => (
                    <CellComponent key={idx} note={note} 
                    action={() => !selectedFret?.equals(note) ? action(new Fret(note, idx)) : action(null)}
                    active={selectedFret?.comparePitchClass(note) ?? false}
                    />
                ))
            }
        </div>
    )
}


export default function Fretboard(
    { rows, tuning, selectedFrets}: 
    {
        rows: number; 
        tuning: Note[]; 
        selectedFrets: SelectedFretState
    }
) {

    const dispatchSelectedFrets = useContext(SelectedFretsDispatchContext)

    // tuning and selected should have the same size
    return(
        <div className="h-full grow place-items-center flex flex-row p-4">
            {
                tuning.map((note: Note, idx) => (
                    <StringComponent key={idx} rows={rows} 
                    firstNote={note} selectedFret={selectedFrets[idx]}
                    action={(fret: Fret | null) => dispatchSelectedFrets({actionType: fretboardActionType.CHANGE_STRING, stringId: idx, newFret: fret})}/>
                ))
            }
        </div>
    )
}