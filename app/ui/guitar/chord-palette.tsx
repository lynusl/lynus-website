'use client'

import { getPitchClassesStartingFrom, getScale } from "@/app/guitar/client-actions";
import { SelectedScaleContext } from "@/app/guitar/interactive";
import { HighlightedPitchClassesActionType, HighlightedPitchClassesContext, HighlightedPitchClassesDispatchContext } from '@/app/guitar/interactive-context';
import { ScaleIntervalNames, ScaleIntervals, TriadTypesInMajor, TriadTypesInMinor, } from "@/app/utils/guitar/constants";
import { Note, PitchClass, PitchClassStrings, ChordTypes, Chord } from "@/app/utils/guitar/types"

import { useContext } from "react";


const ChordCell = ({chord, row, col} : {chord: Chord, row: number, col: number}) => {

    const dispatchHighlightedPitchClasses = useContext(HighlightedPitchClassesDispatchContext);

    return(
         <button className="row-start-1 col-span-1"
         style={{ gridColumnStart: col, gridRowStart: row }}
         onClick={ () => {
            dispatchHighlightedPitchClasses({actionType:HighlightedPitchClassesActionType.SET, newState:chord.getPitchClassesWithRoot()});
         } }>
            {chord.getChordSymbol()}
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
                    chord={new Chord(pitch, TriadTypesInMajor[idx])}
                    row={1}
                    col={getPitchClassesStartingFrom(scaleState.tonic).indexOf(pitch) + 1} />
            ))
        }
        {
            minorRoots.map((pitch, idx) => (
                <ChordCell key={`${scaleState.tonic}_minor_${idx}`} 
                    chord={new Chord(pitch, TriadTypesInMinor[idx])}
                    row={2}
                    col={getPitchClassesStartingFrom(scaleState.tonic).indexOf(pitch) + 1} />
            ))
        }
        </div>
    )
}