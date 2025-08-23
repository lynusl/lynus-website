'use client'

import Fretboard  from "@/app/ui/guitar/fretboard"
import Dashboard from "@/app/ui/guitar/dashboard"
import Image from "next/image"
import homura from "@/public/homura2.png"
import { createContext, Dispatch, SetStateAction, useReducer, useState } from 'react';
import { Note, PitchClass, defaultTuning } from "@/app/utils/guitar/constants"
import { fretboardActionType, fretboardReducer } from "./interactive-context"
import { SelectedFretsContext, SelectedFretsDispatchContext } from "./interactive-context"

// indicates the overall scale selected and stores its notes
interface ScaleState {
    tonic: PitchClass;
}

type SelectedScaleContextType = {
    scaleId: ScaleState;
    setScaleId: Dispatch<SetStateAction<ScaleState>>;
}

export const SelectedScaleContext = createContext<SelectedScaleContextType>({
    scaleId: {
        tonic: PitchClass.C,
    },
    setScaleId: ()=>{}
});

// actual functional component output
export default function InteractiveSpace() {
    const [selectedScale, setSelectedScale] = useState<ScaleState>({
        tonic: PitchClass.C,
    });

    const [chosenFrets, dispatchChosenFrets] = useReducer(fretboardReducer, [null, null, null, null, null, null])

    return(
        <SelectedFretsContext value={chosenFrets}>
            <SelectedFretsDispatchContext value={dispatchChosenFrets}>
                <SelectedScaleContext.Provider value={{scaleId: selectedScale, setScaleId: setSelectedScale}}>
                    <div className="grow m-2 gap-6 flex">
                        <div style={{ position: "relative", display: "block"}} className="flex-2/3 grow-0 outline outline-green-600">
                            {/* <Image className="-z-1" alt="homura" src={homura} fill sizes="100vw" style={{
                                objectFit: 'cover'
                            }}
                            ></Image> */}
                            <Dashboard></Dashboard>
                        </div>
                        <div className="flex-1/3 outline outline-blue-500">
                            <Fretboard rows={12} tuning={defaultTuning} selectedFrets={chosenFrets}></Fretboard>
                        </div>
                    </div>
                </SelectedScaleContext.Provider>
            </SelectedFretsDispatchContext>
        </SelectedFretsContext>
        
        
    )
}