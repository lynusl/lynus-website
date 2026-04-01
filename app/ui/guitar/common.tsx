export function Label({text} : {text: String}) {
    return (
        <div className="text-base/tight flex items-center justify-center h-full
        text-center mr-4
         bg-gray-600 border-gray-800 border-4 cursor-default">
            {text}
        </div>
    )
}