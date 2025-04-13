'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { notes } from '@/app/utils/guitar/constants';
import clsx from 'clsx';

import { SelectedScaleContext } from './dashboard';


const NoteComponent = ({note, id} : {note:string, id:number}) => {
    const {scaleId: buttonId, setScaleId: setButtonId} = useContext(SelectedScaleContext);

    // return(
    //     <div className="flex-1/12 content-center">
    //         <p onClick={() => {onClickAction(id)}} className={clsx(
    //             "rounded-full aspect-square text-center content-center",
    //             {
    //                 "bg-blue-500" : activatedId === id,
    //                 "bg-gray-400" : activatedId !== id
    //             }
    //         )}>
    //             {note}
    //         </p>
    //     </div>
    // )

    return(
        <button onClick={() => {setButtonId(id)}} className={clsx(
            "flex-1 text-center content-center size-fit self-center aspect-square rounded-full text-xl select-none",
            {
                "bg-blue-500" : buttonId === id,
                "bg-gray-400" : buttonId !== id
            }
        )}>{note}</button>
    )
}

export default function NotesBar() {

    return(
        <div className='flex flex-row gap-2 size-full place-items-stretch'>
            {
                notes.map((note, idx) => (
                    <NoteComponent key={idx} note={note} id={idx}/>
                ))
            }
        </div>
    )
}