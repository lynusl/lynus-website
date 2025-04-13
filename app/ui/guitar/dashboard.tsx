'use client'
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import NotesBar from "@/app/ui/guitar/notesbar"

type SelectedScaleContextType = {
    scaleId: number;
    setScaleId: Dispatch<SetStateAction<number>>;
}

export const SelectedScaleContext = createContext<SelectedScaleContextType>({
    scaleId: -1,
    setScaleId: ()=>{}
});

export default function Dashboard() {
    const [selectedScale, setSelectedScale] = useState(-1);

    return(
        <SelectedScaleContext.Provider value={{scaleId: selectedScale, setScaleId: setSelectedScale}}>
            <div className="grow grid grid-cols-5 grid-rows-6 gap-4 p-4 outline h-full">
                <div className="col-span-5 col-start-1 row-span-2 outline outline-amber-100">
                    <NotesBar/>
                </div>
                <div className="col-span-3 col-start-2 row-span-4 row-start-3 outline outline-amber-700">
                    {/* <p>hello</p> */}
                    <NotesBar/>
                </div>
            </div>
        </SelectedScaleContext.Provider>
    )
}