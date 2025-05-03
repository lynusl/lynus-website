'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { notes } from '@/app/utils/guitar/constants';

import { SelectedScaleContext } from '@/app/guitar/interactive';


function getNotesForString(firstNote: string, frets: number = 12) {
    let idx: number = notes.findIndex(note => note===firstNote)
    return Array.from({length: frets}, (v, i) => notes.at((idx + i) % 12)!);
}

// const HeaderFret = ({ note, } : {note:string}) => {
//     return <CellComponent note={note} active={true}/>
// }

const CellComponent = ({ note, active } : {note: string; active?:boolean}) => {
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
            {note}
        </button>
    )
}


const StringComponent = ({ rows, firstNote } : {rows: number; firstNote: string}) => {
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
    { rows, tuning,}: {rows: number; tuning: string[]}
) {
    return(
        <div className="h-full grow place-items-center flex flex-row gap-2 p-4">
            {
                tuning.map((note: string, idx) => (
                    <StringComponent key={idx} rows={rows} firstNote={note}/>
                ))
            }
        </div>
    )
}