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
    const [selected, setSelected] = useState(false);

    return(
        <button onClick={async () => {setSelected(!selected)}}
            className={clsx(
            "basis-full grow-0 text-center align-middle size-sm transition-colors", 
            {
                // tone is in the scale
                'bg-gray-700' : scaleState.tonic != note && scaleState.notes && scaleState.notes.includes(note),

                // tone is the root of the scale
                'bg-blue-900' : scaleState.tonic === note,
            }, 
            {
                // selected
                'text-amber-700 font-bold text-lg' : selected,

                // not selected
                'text-sm first:text-amber-300' : !selected,

            }
        )}
        >
            {PitchClass[note]}
        </button>
    )
}


const StringComponent = ({ rows, firstNote } : {rows: number; firstNote: PitchClass}) => {
    return(
        <div className="basis-full grow-0 h-full flex flex-col place-items-stretch">
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
        <div className="h-full grow place-items-center flex flex-row p-4">
            {
                tuning.map((note: PitchClass, idx) => (
                    <StringComponent key={idx} rows={rows} firstNote={note}/>
                ))
            }
        </div>
    )
}