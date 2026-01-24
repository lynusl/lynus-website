'use client'
import { ActionDispatch, createContext, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { Fret, Note, PitchClass } from "@/app/utils/guitar/types"


import { SelectedScaleContext } from '@/app/guitar/interactive';
import { getNotesForString, getScale } from '@/app/guitar/client-actions';
import { FretboardAction, FretboardActionType, HighlightedPitchClassesContext, SelectedFretsDispatchContext, SelectedFretsState } from "@/app/guitar/interactive-context";


// const HeaderFret = ({ note, } : {note:string}) => {
//     return <CellComponent note={note} active={true}/>
// }

const CellComponent = ({ note, active, action } : {note: Note; active?:boolean; action: () => void}) => {
    const {scaleId: scaleState, setScaleId: setButtonId} = useContext(SelectedScaleContext);

    //TODO: refactor to leverage selected chord instead
    const notes = useContext(HighlightedPitchClassesContext)

    return(
        <button 
            onClick={action}
            className={clsx(
            "grow-0 basis-full text-center align-middle transition-colors first:border-b-4 first:border-amber-400 hover:animate-pulse cursor-pointer", 
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
        <div className="flex-col flex basis-full grow-0 justify-stretch">
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

const FretNumberColumn = ({rows} : {rows: number}) => {
    return(
        <div className="flex-col flex justify-stretch">
            {
                Array.from({length: rows}, (v, i) => (
                    <div key={i} className="grow flex items-center justify-start text-gray-500 first:border-b-4 first:border-amber-400 cursor-default">
                        {i}
                    </div>
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
        selectedFrets: SelectedFretsState
    }
) {

    const dispatchSelectedFrets = useContext(SelectedFretsDispatchContext)

    // tuning and selected should have the same size
    return(
        <div className="h-full flex flex-row p-4">
            <FretNumberColumn rows={rows}/>
            {
                tuning.map((note: Note, idx) => (
                    <StringComponent key={idx} rows={rows} 
                    firstNote={note} selectedFret={selectedFrets[idx]}
                    action={(fret: Fret | null) => dispatchSelectedFrets({actionType: FretboardActionType.CHANGE_STRING, stringId: idx, newFret: fret})}/>
                ))
            }
        </div>
    )
}