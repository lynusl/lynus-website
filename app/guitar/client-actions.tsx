import { PitchClass, ScaleIntervals, ScaleIntervalNames, Note, createNote } from "@/app/utils/guitar/constants"

export function getScale(tonic: PitchClass, scaleType: ScaleIntervalNames) : PitchClass[] {
    // get running sum of intervals (with base of tonic)
    // https://stackoverflow.com/questions/20477177/creating-an-array-of-cumulative-sum-in-javascript
    let sum = 0
    let intervals = ScaleIntervals[scaleType].map((sum = 0, n => sum += n))
    return Array.from(intervals, (v, i) => (tonic + v) % 12)
}

export function getNotesForString(firstNote: Note, frets: number = 12) : Note[] {
    return Array.from({length: frets}, (v, i) => createNote(firstNote.value + i))
}