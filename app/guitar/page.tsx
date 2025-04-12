import Fretboard  from "@/app/ui/guitar/fretboard"
import Image from "next/image"
import homura from "@/public/homura2.png"

export default function GuitarPage() {
    return(
        <div className="h-full flex flex-col" >
            <header className="flex-none text-center text-2xl outline-amber-500 outline p-6 m-2">
                Lynus' Guitar Tool
            </header>
            <main className="grow m-2 gap-6 flex">
                <div style={{ position: "relative", display: "block"}} className="flex-2/3 grow-0 outline outline-green-600">
                    <Image alt="homura" src={homura} fill sizes="100vw" style={{
                        objectFit: 'cover'
                    }}
                    >

                    </Image>
                </div>
                <div className="flex-1/3 outline outline-blue-500">
                    <Fretboard rows={12} tuning={['E', 'A', 'D', 'G', 'B', 'E']}/>
                </div>
            </main>
        </div>
    )
}