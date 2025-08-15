import Fretboard  from "@/app/ui/guitar/fretboard"
import Dashboard from "@/app/ui/guitar/dashboard"
import Image from "next/image"
import homura from "@/public/homura2.png"
import InteractiveSpace from "./interactive"
import { Cog6ToothIcon } from "@heroicons/react/16/solid"

export default function GuitarPage() {
    return(
        <div className="h-full flex flex-col" >
            <header className="relative flex-none text-center text-2xl outline-amber-500 outline px-4 py-2 m-2">
                <h1> Lynus' Guitar Tool </h1>
                <Cog6ToothIcon className="absolute right-4 inset-y-0 h-5 w-5 self-center"></Cog6ToothIcon>
            </header>
            <InteractiveSpace></InteractiveSpace>
        </div>
    )
}