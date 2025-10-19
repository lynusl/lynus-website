'use client'

import { getScale } from "@/app/guitar/client-actions";
import { SelectedScaleContext } from "@/app/guitar/interactive";
import { HighlightedPitchClassesContext, HighlightedPitchClassesDispatchContext } from "@/app/guitar/interactive-context";
import { ScaleIntervalNames, ScaleIntervals } from "@/app/utils/guitar/constants";
import { useContext } from "react";


const chordCell = () => {
    
}

export default function ChordPalette() {
    const {scaleId: scaleState} = useContext(SelectedScaleContext);
    const highlightedPitchClasses = useContext(HighlightedPitchClassesContext);
    const dispatchHighlightedPitchClasses = useContext(HighlightedPitchClassesDispatchContext);

    const majorRoots = getScale(scaleState.tonic, "MAJOR")
    const minorRoots = getScale(scaleState.tonic, "NATURAL_MINOR")

    
    return(
        <div className="grid grid-rows-2 grid-cols-7">

        </div>
    )
}