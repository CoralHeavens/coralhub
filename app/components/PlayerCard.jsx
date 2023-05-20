import React, {useState} from "react";
import Spinner from "./Spinner";
import useWindowSize from "../hooks/useWindowSize";

export default function PlayerCard({
    url
}) {
    const [isLoaded, updateIsLoaded] = useState(false);
    const size = useWindowSize();

    return (
        <div className='w-full h-full bg-black rounded-[20px]'>
            <iframe
                className={isLoaded ? 'cursor-pointer relative rounded-[20px]' : 'hidden'}
                width={size.width * 0.6}
                height={size.height * 0.6}
                src={url}
                onLoad={() => updateIsLoaded(true)}
                allow={"fullscreen"}
            ></iframe>
            <Spinner isLoaded={isLoaded} />
        </div>
    )
}