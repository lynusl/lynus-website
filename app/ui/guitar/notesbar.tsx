'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { ScaleIntervals} from '@/app/utils/guitar/constants';
import { PitchClass, PitchClassStrings } from "@/app/utils/guitar/types"
import { Button } from "@/components/ui/button"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import clsx from 'clsx';
// import { getKey } from '@/app/guitar/actions';
import { getScale, getPitchClassesStartingFrom, getChordPitchClasses, getPitchClassesStartingFromExcludingSelf } from '@/app/guitar/client-actions';

import { SelectedScaleContext } from '@/app/guitar/interactive';
import { HighlightedPitchClassesActionType, HighlightedPitchClassesContext, HighlightedPitchClassesDispatchContext } from '@/app/guitar/interactive-context';
import { Label } from './common';

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
                getPitchClassesStartingFromExcludingSelf(scaleState.tonic).map((pitch, idx) => (
                    <button key={`${idx}_${pitch}`} onClick={() => {
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


export function KeySelectionBar() {
    const {scaleId: scaleState, setScaleId: setScaleState} = useContext(SelectedScaleContext);

    return(
        <div className='flex flex-row size-full justify-evenly h-full'>
            <div className="w-1/8 flex-none h-full">
                <Label text="Key"/>
            </div>
            <ToggleGroup type="single" className='size-full h-full' variant="outline">
{
                getPitchClassesStartingFromExcludingSelf(PitchClass.C).map((pitch, idx) => (
                    <ToggleGroupItem key={`${idx}_${pitch}`} 
                    onClick={() => {
                        setScaleState({"tonic": pitch});
                    }}
                    value={pitch.toString()}
                    className={clsx(
                        "flex-1 text-xl h-full data-[state=on]:bg-blue-500"
                        )}
                        >{PitchClassStrings[pitch]}</ToggleGroupItem>
                    ))
                }
            </ToggleGroup>
            
        </div>
    )
}

// export function KeySelectionBar() {
//     const {scaleId: scaleState, setScaleId: setScaleState} = useContext(SelectedScaleContext);

//     return(
//         <div className='flex flex-row size-full justify-evenly' role="radiogroup">
//             <div className="w-1/8 flex-none h-full">
//                 <Label text="Key"/>
//             </div>
//             {
//                 getPitchClassesStartingFromExcludingSelf(PitchClass.C).map((pitch, idx) => (
//                     <button key={`${idx}_${pitch}`} 
//                     role="radio"
//                     onClick={() => {
//                         setScaleState({"tonic": pitch});
//                     }}
//                     aria-selected={scaleState.tonic === pitch} 
//                     className={clsx(
//                         "cursor-pointer flex-1 text-xl select-none transition-colors duration-300 \
//                         z-0 focus:z-1 focus:outline-4 focus:outline-offset-2 \
//                         bg-gray-400 not-aria-selected:text-gray-800 \
//                         hover:text-white \
//                          focus:outline-blue-400 aria-selected:bg-blue-500",
//                         // {
//                         //     "bg-blue-500" : scaleState.tonic === pitch,
//                         //     "bg-gray-400 text-gray-800" : scaleState.tonic !== pitch
//                         // }
//                     )}>{PitchClassStrings[pitch]}</button>
//                 ))
//             }
//         </div>
//     )
// }

export function ScaleDisplayBar({scaleName} : {scaleName : keyof typeof ScaleIntervals}) {
    const {scaleId: scaleState} = useContext(SelectedScaleContext);
    const highlightedPitchClasses = useContext(HighlightedPitchClassesContext);
    const dispatchHighlightedPitchClasses = useContext(HighlightedPitchClassesDispatchContext);

    const scalePitches = getScale(scaleState.tonic, scaleName)
    
    return(
        <div className='flex flex-row items-stretch text-center'>
            <div className="w-1/8 h-auto">
                <Label text={scaleName.replace("_", " ")}/>
            </div>
            {/* todo... refactor into components for reusability... */}
            {
                getPitchClassesStartingFromExcludingSelf(scaleState.tonic).map((pitch, idx) => (
                    <button key={`${idx}_${pitch}`} 
                    onClick={() => {dispatchHighlightedPitchClasses(
                        {actionType:HighlightedPitchClassesActionType.TOGGLE, 
                            toggledPitchClass:pitch})}
                        } 
                    className={clsx(
                        "flex-1 content-center size-fit aspect-square text-xl select-none enabled:cursor-pointer disabled:cursor-not-allowed",
                        {
                            "text-blue-500" : scaleState.tonic === pitch,
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