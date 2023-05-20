import {BACKGROUND_URL} from "../constants/globals";
import Spinner from "./Spinner";
import {useEffect, useRef, useState} from "react";
import joinClassNames from "../helpers/joinClassNames";

export default function Background({
    imgURL = BACKGROUND_URL
}) {
    const [isLoaded, updateIsLoaded] = useState(false);
    const bgRef = useRef();

    useEffect(() => {
        if (bgRef.current.clientWidth > 0) updateIsLoaded(true)
    }, [])

    return (
        <section className='fixed left-0 top-0 w-screen h-screen -z-10 pointer-events-none'>
            <img
                ref={bgRef}
                className={joinClassNames(
                    'object-cover w-screen h-screen'
                )}
                src={imgURL}
                alt=''
            />
            <Spinner isLoaded={isLoaded} />
        </section>
    )
}