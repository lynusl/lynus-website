// Notes types

import { Note, PitchClass, Intervals, ChordTypes } from "./types"

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

export const TriadTypesInMajor = [
    "MAJOR_TRIAD", 
    "MINOR_TRIAD", 
    "MINOR_TRIAD", 
    "MAJOR_TRIAD", 
    "MAJOR_TRIAD", 
    "MINOR_TRIAD", 
    "DIMINISHED_TRIAD", 
] as (keyof typeof ChordTypes)[];

export const TriadTypesInMinor = [
    "MINOR_TRIAD", 
    "DIMINISHED_TRIAD", 
    "MAJOR_TRIAD", 
    "MINOR_TRIAD", 
    "MINOR_TRIAD", 
    "MAJOR_TRIAD", 
    "MAJOR_TRIAD", 
] as (keyof typeof ChordTypes)[];


// TODO: clean this file. maybe separate into Types and Constants?