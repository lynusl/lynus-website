// Notes types

import { Note, PitchClass } from "./types"

export const defaultTuning = [
    new Note(PitchClass.E, 2),
    new Note(PitchClass.A, 2),
    new Note(PitchClass.D, 3),
    new Note(PitchClass.G, 3),
    new Note(PitchClass.B, 3),
    new Note(PitchClass.E, 4),
]

// Scales

export const ScaleIntervals = {
    MAJOR: [2,2,1,2,2,2],
    NATURAL_MINOR: [2,1,2,2,1,2],
    HARMONIC_MINOR: [2,1,2,2,1,3],
    MELODIC_MINOR: [2,1,2,2,2,1],

    MAJOR_TRIAD: [4,3],
}

export const ScaleIntervalNames = Object.keys(ScaleIntervals) as (keyof typeof ScaleIntervals)[]

export const Intervals = {
    MINOR_THIRD: 3,
    MAJOR_THIRD: 4,
    DIMINISHED_FIFTH: 6,
    PERFECT_FIFTH: 7,
    AUGMENTED_FIFTH: 8,
    MINOR_SEVENTH: 10,
    MAJOR_SEVENTH: 11
}

export const ChordTypes = {
    MAJOR_TRIAD: [Intervals.MAJOR_THIRD, Intervals.PERFECT_FIFTH],
    MINOR_TRIAD: [Intervals.MINOR_THIRD, Intervals.PERFECT_FIFTH],
    AUGMENTED_TRIAD: [Intervals.MAJOR_THIRD, Intervals.AUGMENTED_FIFTH],
    DIMINISHED_TRIAD: [Intervals.MINOR_THIRD, Intervals.DIMINISHED_FIFTH],
    DOMINANT_SEVENTH: [Intervals.MAJOR_THIRD, Intervals.PERFECT_FIFTH, Intervals.MINOR_SEVENTH],
    MINOR_SEVENTH: [Intervals.MINOR_THIRD, Intervals.PERFECT_FIFTH, Intervals.MINOR_SEVENTH],
    MAJOR_SEVENTH: [Intervals.MAJOR_THIRD, Intervals.PERFECT_FIFTH, Intervals.MAJOR_SEVENTH],
}

export const ChordTypeNames = Object.keys(ChordTypes) as (keyof typeof ChordTypes)[]

export const TriadTypesInMajor = [
    ChordTypes.MAJOR_TRIAD, 
    ChordTypes.MINOR_TRIAD, 
    ChordTypes.MINOR_TRIAD, 
    ChordTypes.MAJOR_TRIAD, 
    ChordTypes.MAJOR_TRIAD, 
    ChordTypes.MINOR_TRIAD, 
    ChordTypes.DIMINISHED_TRIAD, 
]

export const TriadTypesInMinor = [
    ChordTypes.MINOR_TRIAD, 
    ChordTypes.DIMINISHED_TRIAD, 
    ChordTypes.MAJOR_TRIAD, 
    ChordTypes.MINOR_TRIAD, 
    ChordTypes.MINOR_TRIAD, 
    ChordTypes.MAJOR_TRIAD, 
    ChordTypes.MAJOR_TRIAD, 
]


// TODO: clean this file. maybe separate into Types and Constants?