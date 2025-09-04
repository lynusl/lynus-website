'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { PitchClass, PitchClassStrings, ScaleIntervals} from '@/app/utils/guitar/constants';
import clsx from 'clsx';
// import { getKey } from '@/app/guitar/actions';
import { getScale, getPitchClassesStartingFrom, getChordPitchClasses } from '@/app/guitar/client-actions';

import { SelectedScaleContext } from '@/app/guitar/interactive';
import { HighlightedPitchClassesActionType, HighlightedPitchClassesContext, HighlightedPitchClassesDispatchContext } from '@/app/guitar/interactive-context';


const NoteComponent = ({pitchClass: note, id, disabled = false} : {pitchClass: PitchClass, id:number, disabled?:boolean}) => {
    const {scaleId: scaleState, setScaleId: setScaleState} = useContext(SelectedScaleContext);

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
        <button disabled={disabled} onClick={() => {setScaleState({"tonic": note})}} className={clsx(
            "flex-1 text-center content-center size-fit self-center aspect-square rounded-full text-xl select-none",
            {
                "bg-blue-500" : scaleState.tonic === note,
                "bg-gray-400 text-gray-800" : scaleState.tonic !== note
            },
            { 
                "cursor-pointer" : !disabled
            }
        )}>{PitchClassStrings[note]}</button>
    )
}

export function SelectableNotesBar() {
    const {scaleId: scaleState, setScaleId: setScaleState} = useContext(SelectedScaleContext);
    const dispatchHighlightedPitchClasses = useContext(HighlightedPitchClassesDispatchContext);


    return(
        <div className='flex flex-row gap-2 size-full place-items-stretch'>
            {
                PitchClassStrings.map((pitch, idx) => (
                    <button key={pitch} onClick={() => {
                        setScaleState({"tonic": idx});
                        dispatchHighlightedPitchClasses({actionType:HighlightedPitchClassesActionType.SET, newState:getChordPitchClasses(idx, "MAJOR_TRIAD")})
                    }} className={clsx(
                        "cursor-pointer flex-1 text-center content-center size-fit self-center aspect-square rounded-full text-xl select-none",
                        {
                            "bg-blue-500" : scaleState.tonic === idx,
                            "bg-gray-400 text-gray-800" : scaleState.tonic !== idx
                        }
                    )}>{pitch}</button>
                ))
            }
        </div>
    )
}

export function ScaleDisplayBar({scaleName} : {scaleName : keyof typeof ScaleIntervals}) {
    const {scaleId: scaleState} = useContext(SelectedScaleContext);
    const highlightedPitchClasses = useContext(HighlightedPitchClassesContext);
    const dispatchHighlightedPitchClasses = useContext(HighlightedPitchClassesDispatchContext);

    const scalePitches = getScale(scaleState.tonic, scaleName)
    
    return(
        <div className='flex flex-row text-center items-center'>
            <h4 className="w-1/8 flex-none align-middle text-base/tight">
                {scaleName.replace("_", " ")}
            </h4>
            {
                getPitchClassesStartingFrom(scaleState.tonic).map((pitch, idx) => (
                    <button key={`${idx}_${pitch}`} 
                    disabled={scaleState.tonic === pitch}
                    onClick={() => {dispatchHighlightedPitchClasses(
                        {actionType:HighlightedPitchClassesActionType.TOGGLE, 
                            toggledPitchClass:pitch})}
                        } 
                    className={clsx(
                        "flex-1 content-center size-fit aspect-square text-xl select-none enabled:cursor-pointer disabled:cursor-not-allowed",
                        {
                            "bg-blue-500" : scaleState.tonic === pitch,
                            "text-white" : scaleState.tonic != pitch && scalePitches.includes(pitch),
                            "opacity-25" : scaleState.tonic !== pitch && !scalePitches.includes(pitch)
                        },
                        {
                            "bg-gray-400 text-gray-800" : highlightedPitchClasses.includes(pitch)
                        }
                    )}>{PitchClassStrings[pitch]}</button>
                ))
            }
        </div>
    )
}