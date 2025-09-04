import { SelectedFretsContext } from "@/app/guitar/interactive-context"
import { SelectableNotesBar , ScaleDisplayBar} from "@/app/ui/guitar/notesbar"
import { useContext } from "react"

export default function Dashboard() {

    const selectedFrets = useContext(SelectedFretsContext)

    return(
        <div className="grow grid grid-cols-5 grid-rows-6 gap-4 p-4 outline h-full">
            <div className="col-span-5 col-start-1 row-span-1 outline outline-amber-100">
                <SelectableNotesBar/>
            </div>
            <div className="col-span-5 col-start-1 row-span-4 row-start-2 outline outline-amber-700 flex-col place-content-evenly">
                {/* <p>hello</p> */}
                <ScaleDisplayBar scaleName="MAJOR"/>
                <ScaleDisplayBar scaleName="NATURAL_MINOR"/>
                <ScaleDisplayBar scaleName="HARMONIC_MINOR"/>
                <ScaleDisplayBar scaleName="MELODIC_MINOR"/>
            </div>
            <div className="col-span-3 col-start-2 row-span-1 row-start-6 outline outline-cyan-500 content-end">
                <h2 className="text-center">
                    { selectedFrets.map((v, i) => v == null ? "x" : v.fretNumber).join(" ") }
                </h2>
            </div>
        </div>
    )
}