import Fretboard  from "@/app/ui/guitar/fretboard"
import Dashboard from "@/app/ui/guitar/dashboard"
import Image from "next/image"
import homura from "@/public/homura2.png"
import InteractiveSpace from "./interactive"

export default function GuitarPage() {
    return(
        <div className="h-full flex flex-col" >
            <header className="flex-none text-center text-2xl outline-amber-500 outline p-6 m-2">
                Lynus' Guitar Tool
            </header>
            <InteractiveSpace></InteractiveSpace>
        </div>
    )
}