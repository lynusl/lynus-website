export type Note = {
    frequency: number;
    pitchClass: PitchClass;
    scientificNoteName: string;
    octave: number;
};

// function constructNote()

// type alphabet = "A" | "B" | "C";
// type numbers = 1 | 2 | 3;

// type notes = `${alphabet}${numbers}`;

export enum PitchClass {
    'C' = 0,
    'C#', 
    'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
}

type PitchClassType = keyof typeof PitchClass;
export const notes = Object.values(PitchClass).filter(x => !isNaN(Number(x))) as PitchClass[];

export const defaultTuning = [PitchClass.E, PitchClass.A, PitchClass.D, PitchClass.G, PitchClass.B, PitchClass.E]

export const ScaleIntervals = {
    MAJOR: [2,2,1,2,2,2],
    MINOR: [2,1,2,2,1,2]
}

export type ScaleIntervalNames = keyof typeof ScaleIntervals