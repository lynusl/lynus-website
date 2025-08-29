// Notes types

export enum PitchClass {
    C,
    C_SHARP,
    D,
    D_SHARP,
    E,
    F,
    F_SHARP,
    G,
    G_SHARP,
    A,
    A_SHARP,
    B
}

export const PitchClassStrings = ['C', 'C#','D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export class Note {
    public readonly pitchClassStr: string;
    public readonly value: number;
    constructor(
        public readonly pitchClass: PitchClass,
        public readonly octave: number
    ) {
        this.pitchClassStr = PitchClassStrings[pitchClass];
        this.value = octave * 12 + pitchClass;
    }

    // Compare notes
    public compare(other: Note): number {
        return this.value - other.value;
    }

    // Check if notes are equal
    public equals(other: Note): boolean {
        return this.value === other.value;
    }

    // Get interval between notes
    public getAbsoluteInterval(other: Note): number {
        return Math.abs(this.value - other.value);
    }

    // check if same pitch class
    public comparePitchClass(other: Note | PitchClass) : boolean {
        if (other instanceof Note) {
            return this.pitchClass == other.pitchClass;
        }
        return this.pitchClass == other;
    }

    public toString(): string {
        return this.pitchClassStr + this.octave.toString()
    }
}

export class Fret extends Note {
    constructor(
        note: Note,
        public readonly fretNumber: number
    ) {
        super(note.pitchClass, note.octave)
    }
}

export function createNote(value: number) {
    return new Note(value % 12, Math.floor(value / 12))
}

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
    MINOR: [2,1,2,2,1,2],
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

export const ChordShapes = {
    MAJOR_TRIAD: [Intervals.MAJOR_THIRD, Intervals.PERFECT_FIFTH],
    MINOR_TRIAD: [Intervals.MINOR_THIRD, Intervals.PERFECT_FIFTH],
    AUGMENTED_TRIAD: [Intervals.MAJOR_THIRD, Intervals.AUGMENTED_FIFTH],
    DIMINISHED_TRIAD: [Intervals.MINOR_THIRD, Intervals.DIMINISHED_FIFTH],
    DOMINANT_SEVENTH: [Intervals.MAJOR_THIRD, Intervals.PERFECT_FIFTH, Intervals.MINOR_SEVENTH],
    MINOR_SEVENTH: [Intervals.MINOR_THIRD, Intervals.PERFECT_FIFTH, Intervals.MINOR_SEVENTH],
    MAJOR_SEVENTH: [Intervals.MAJOR_THIRD, Intervals.PERFECT_FIFTH, Intervals.MAJOR_SEVENTH],
}

export const ChordShapeNames = Object.keys(ChordShapes) as (keyof typeof ChordShapes)[]

