import { clsx } from 'clsx';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function getNotesForString(firstNote: string, frets: number = 12) {
    let idx: number = notes.findIndex(note => note===firstNote)
    return Array.from({length: frets}, (v, i) => notes.at((idx + i + 1) % 12)!);
}

// const HeaderFret = ({ note, } : {note:string}) => {
//     return <CellComponent note={note} active={true}/>
// }

const CellComponent = ({ note, active, header } : {note: string; active?:boolean; header?:boolean}) => {
    return(
        <button className={clsx(
            "outline flex-1 text-sm text-center align-middle rounded-md size-sm", 
            {
                'bg-gray-700' : active === true,
                'bg-gray-900 text-amber-300' : header === true
            },
        )}
        >
            {note}
        </button>
    )
}


const StringComponent = ({ rows, firstNote } : {rows: number; firstNote: string}) => {
    return(
        <div className="grow h-full flex flex-col gap-2 place-items-stretch">
            <CellComponent note={firstNote} header={true}/>
            {
                getNotesForString(firstNote, rows).map((note, idx) => (
                    <CellComponent key={idx} note={note}/>
                ))
            }
        </div>
    )
}


export default function Fretboard(
    { rows, tuning,}: {rows: number; tuning: string[]}
) {
    return(
        <div className="h-full grow place-items-center flex flex-row gap-2 p-4">
            {
                tuning.map((note: string, idx) => (
                    <StringComponent key={idx} rows={rows} firstNote={note}/>
                ))
            }
        </div>
    )
}