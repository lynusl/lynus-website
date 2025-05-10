'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { notes } from '@/app/utils/guitar/constants';

import { SelectedScaleContext } from '@/app/guitar/interactive';
import { PitchClass } from '@/app/utils/guitar/constants';
import { getNotesForString } from '@/app/guitar/client-actions';

// const HeaderFret = ({ note, } : {note:string}) => {
//     return <CellComponent note={note} active={true}/>
// }

const CellComponent = ({ note, active } : {note: PitchClass; active?:boolean}) => {
    const {scaleId: scaleState, setScaleId: setButtonId} = useContext(SelectedScaleContext);
    
    return(
        <button className={clsx(
            "outline flex-1 text-sm text-center align-middle rounded-md size-sm first:text-amber-300", 
            {
                'bg-gray-700' : scaleState.tonic != note && scaleState.notes && scaleState.notes.includes(note),
                'bg-gray-800' : scaleState.tonic === note
            },
        )}
        >
            {PitchClass[note]}
        </button>
    )
}


const StringComponent = ({ rows, firstNote } : {rows: number; firstNote: PitchClass}) => {
    return(
        <div className="grow h-full flex flex-col gap-2 place-items-stretch">
            {
                getNotesForString(firstNote, rows).map((note, idx) => (
                    <CellComponent key={idx} note={note}/>
                ))
            }
        </div>
    )
}


export default function Fretboard(
    { rows, tuning,}: {rows: number; tuning: PitchClass[]}
) {
    return(
        <div className="h-full grow place-items-center flex flex-row gap-2 p-4">
            {
                tuning.map((note: PitchClass, idx) => (
                    <StringComponent key={idx} rows={rows} firstNote={note}/>
                ))
            }
        </div>
    )
}