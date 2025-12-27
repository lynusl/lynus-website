'use client'

import { getPitchClassesStartingFrom, getScale } from "@/app/guitar/client-actions";
import { SelectedScaleContext } from "@/app/guitar/interactive";
import { HighlightedPitchClassesContext, HighlightedPitchClassesDispatchContext } from "@/app/guitar/interactive-context";
import { PitchClass, PitchClassStrings, ScaleIntervalNames, ScaleIntervals, TriadTypesInMajor, TriadTypesInMinor, ChordTypes } from "@/app/utils/guitar/constants";
import { useContext } from "react";


const ChordCell = ({root, row, col} : {root: PitchClass, row: number, col: number}) => {

    return(
         <button className="row-start-1 col-span-1"
         style={{ gridColumnStart: col, gridRowStart: row }}>
            {PitchClassStrings[root]}
        </button>
    )
}

export default function ChordPalette() {
    const {scaleId: scaleState} = useContext(SelectedScaleContext);
    const highlightedPitchClasses = useContext(HighlightedPitchClassesContext);
    const dispatchHighlightedPitchClasses = useContext(HighlightedPitchClassesDispatchContext);

    const majorRoots = getScale(scaleState.tonic, "MAJOR")
    const minorRoots = getScale(scaleState.tonic, "NATURAL_MINOR")
    
    // to refactor based on creation of a new Chord class
    // which will be in charge of handling quality, name, etc
    return(
        <div className="grid grid-rows-2 grid-cols-12 h-full">
        {    
            majorRoots.map((pitch, idx) => (
                <ChordCell key={`${scaleState.tonic}_major_${idx}`} 
                    root={pitch}
                    row={1}
                    col={getPitchClassesStartingFrom(scaleState.tonic).indexOf(pitch) + 1} />
            ))
        }
        {
            minorRoots.map((pitch, idx) => (
                <ChordCell key={`${scaleState.tonic}_minor_${idx}`} 
                    root={pitch}
                    row={2}
                    col={getPitchClassesStartingFrom(scaleState.tonic).indexOf(pitch) + 1} />
            ))
        }
        </div>
    )
}