'use client'

import Fretboard  from "@/app/ui/guitar/fretboard"
import Dashboard from "@/app/ui/guitar/dashboard"
import Image from "next/image"
import homura from "@/public/homura2.png"
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { getKey } from "./actions"

interface ScaleState {
    tonic: string;
    notes: string[];
}


type SelectedScaleContextType = {
    scaleId: ScaleState;
    setScaleId: Dispatch<SetStateAction<ScaleState>>;
}

export const SelectedScaleContext = createContext<SelectedScaleContextType>({
    scaleId: {
        tonic: "",
        notes: [""]
    },
    setScaleId: ()=>{}
});

// enum ScaleActionKind {
//     UPDATE = 'UPDATE'
// }

// interface ScaleAction {
//     type: ScaleActionKind;
//     payload: string;
// }

interface ScaleState {
    tonic: string;
    notes: string[];
}


// function scaleReducer(state: ScaleState, action: ScaleAction) {
//     const { type, payload } = action;
//     switch (type) {
//         case ScaleActionKind.UPDATE:
//             return {
//                 tonic: payload,
//                 notes: getKey(payload)
//             }
//         default:
//             return state;
//     }
// }


export default function InteractiveSpace() {
    const [selectedScale, setSelectedScale] = useState(-1);

    return(
        <SelectedScaleContext.Provider value={{scaleId: selectedScale, setScaleId: setSelectedScale}}>
            <div className="grow m-2 gap-6 flex">
                <div style={{ position: "relative", display: "block"}} className="flex-2/3 grow-0 outline outline-green-600">
                    <Image className="-z-1" alt="homura" src={homura} fill sizes="100vw" style={{
                        objectFit: 'cover'
                    }}
                    ></Image>
                    <Dashboard></Dashboard>
                </div>
                <div className="flex-1/3 outline outline-blue-500">
                    <Fretboard rows={12} tuning={['E', 'A', 'D', 'G', 'B', 'E']}/>
                </div>
            </div>
        </SelectedScaleContext.Provider>
        
    )
}