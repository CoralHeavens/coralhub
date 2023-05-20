import React, {useEffect, useRef, useState} from "react";
import Spinner from "./Spinner";
import useWindowSize from "../hooks/useWindowSize";

export default function PlayerCard({
    url,
    title,
    index
}) {
    const [isLoaded, updateIsLoaded] = useState(false);
    const [playerSize, updatePlayerSize] = useState({ width: 0, height: 0 })
    const size = useWindowSize();
    const containerRef = useRef();

    useEffect(() => {
        updatePlayerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight
        })
    }, [size])

    return (
        <div className='w-full h-full bg-black rounded-[20px]' ref={containerRef}>
            <iframe
                title={`${title}-${index}`}
                className={isLoaded ? 'cursor-pointer relative rounded-[20px]' : 'hidden'}
                width={playerSize.width}
                height={playerSize.height}
                src={url}
                onLoad={() => updateIsLoaded(true)}
                allow={"fullscreen"}></iframe>
            <Spinner isLoaded={isLoaded} />
        </div>
    )
}