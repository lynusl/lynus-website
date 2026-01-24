import { ScaleIntervals, ChordTypes } from "@/app/utils/guitar/constants"
import { Note, PitchClass, createNote } from "@/app/utils/guitar/types"


export function getScale(tonic: PitchClass, scaleType: keyof typeof ScaleIntervals) : PitchClass[] {
    // get running sum of intervals (with base of tonic)
    // https://stackoverflow.com/questions/20477177/creating-an-array-of-cumulative-sum-in-javascript
    let sum = 0
    let intervals = ScaleIntervals[scaleType].map((sum = 0, n => sum += n))
    return [tonic].concat(Array.from(intervals, (v, i) => (tonic + v) % 12))
}

export function getPitchClassesStartingFrom(start: PitchClass) : PitchClass[] {
    return Array.from({length: 13}, (v, i) => (start + i) % 12)
}

export function getNotesForString(firstNote: Note, frets: number = 12) : Note[] {
    return Array.from({length: frets}, (v, i) => createNote(firstNote.value + i))
}

export function getChordPitchClasses(tonic: PitchClass, chordType: keyof typeof ChordTypes) : PitchClass[] {
    return Array.from(ChordTypes[chordType], (v) => (tonic + v) % 12)
}