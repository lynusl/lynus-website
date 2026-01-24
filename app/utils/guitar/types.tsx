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

export class Chord {
    public readonly pitchClasses: PitchClass[];

    constructor(
        public readonly root: PitchClass,
        public readonly chordType: keyof typeof ChordTypes
    ) {
        this.pitchClasses = Array.from(ChordTypes[chordType], (v) => (root + v) % 12)
    }

    public getPitchClasses(): PitchClass[] {
        return this.pitchClasses;
    }

    public getPitchClassesWithRoot(): PitchClass[] {
        return [this.root].concat(this.pitchClasses);
    }

    public getChordSymbol(): string {
        
        switch (this.chordType) {
            case "MAJOR_TRIAD": return PitchClassStrings[this.root];
            case "MINOR_TRIAD": return PitchClassStrings[this.root]+"m";
            case "AUGMENTED_TRIAD": return PitchClassStrings[this.root]+"+";
            case "DIMINISHED_TRIAD": return PitchClassStrings[this.root]+"°";
            case "DOMINANT_SEVENTH": return PitchClassStrings[this.root]+"7";
            case "MINOR_SEVENTH": return PitchClassStrings[this.root]+"maj7";
            case "MAJOR_SEVENTH": return PitchClassStrings[this.root]+"m7";

            default:
                return "?";
        }
    }
}