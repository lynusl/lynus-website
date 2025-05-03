'use server'
import { notes } from "../utils/guitar/constants";
 
export async function getKey(tonic: string) {
    let response = await fetch("http://127.0.0.1:8000/key/"+encodeURIComponent(tonic))
    let pitchClasses = await response.json()
    return(pitchClasses.map((pc: number) => notes.at(pc)))
}