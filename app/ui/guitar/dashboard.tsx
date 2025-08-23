import { SelectedFretsContext } from "@/app/guitar/interactive-context"
import NotesBar from "@/app/ui/guitar/notesbar"
import { useContext } from "react"

export default function Dashboard() {

    const selectedFrets = useContext(SelectedFretsContext)

    return(
        <div className="grow grid grid-cols-5 grid-rows-6 gap-4 p-4 outline h-full">
            <div className="col-span-5 col-start-1 row-span-2 outline outline-amber-100">
                <NotesBar/>
            </div>
            <div className="col-span-3 col-start-2 row-span-3 row-start-3 outline outline-amber-700">
                {/* <p>hello</p> */}
                <NotesBar/>
            </div>
            <div className="col-span-3 col-start-2 row-span-1 row-start-6 outline outline-cyan-500 content-end">
                <h2 className="text-center">
                    { selectedFrets.map((v, i) => v == null ? "x" : v.fretNumber).join(" ") }
                </h2>
            </div>
        </div>
    )
}