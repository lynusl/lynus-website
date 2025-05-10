import { PitchClass, notes, ScaleIntervals, ScaleIntervalNames } from "@/app/utils/guitar/constants"

export function getScale(tonic: PitchClass, scaleType: ScaleIntervalNames) : PitchClass[] {
    // get running sum of intervals (with base of tonic)
    // https://stackoverflow.com/questions/20477177/creating-an-array-of-cumulative-sum-in-javascript
    let sum = 0
    let intervals = ScaleIntervals[scaleType].map((sum = 0, n => sum += n))
    return Array.from(intervals, (v, i) => notes[(notes.indexOf(tonic) + v) % 12])
}

export function getNotesForString(firstNote: PitchClass, frets: number = 12) : PitchClass[] {
    return Array.from({length: frets}, (v, i) => notes[(notes.indexOf(firstNote) + i) % 12])
}