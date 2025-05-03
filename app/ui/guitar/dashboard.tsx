import NotesBar from "@/app/ui/guitar/notesbar"

export default function Dashboard() {

    return(
        <div className="grow grid grid-cols-5 grid-rows-6 gap-4 p-4 outline h-full">
            <div className="col-span-5 col-start-1 row-span-2 outline outline-amber-100">
                <NotesBar/>
            </div>
            <div className="col-span-3 col-start-2 row-span-4 row-start-3 outline outline-amber-700">
                {/* <p>hello</p> */}
                <NotesBar/>
            </div>
        </div>
    )
}