import React, {useMemo, useState} from "react";
import joinClassNames from "../helpers/joinClassNames";
import {load, save} from "../helpers/localStorage";

const VISIBLE_SLIDES = 7;
const SIDE_SLIDES = Math.round(VISIBLE_SLIDES / 2) - 1;

export default function Slider({
    items,
    saveKey = 'sliderFocus'
}) {
    const [focus, updateFocus] = useState(load(saveKey) ?? 0);
    const prevSlide = () => {
        const nextFocus = focus - 1;
        updateFocus(nextFocus);
        save(saveKey, nextFocus);
    }

    const nextSlide = () => {
        const nextFocus = focus + 1;
        updateFocus(nextFocus);
        save(saveKey, nextFocus);
    }

    const phantomItems = useMemo(() => {
        const startIndex = focus >= SIDE_SLIDES ? focus - SIDE_SLIDES : 0;
        let leftPhantom = [];
        let rightPhantom = [];

        if (focus < SIDE_SLIDES) {
            leftPhantom = Array.from({length: SIDE_SLIDES - focus});
        }

        if (focus >= items.length - 1) {
            rightPhantom = Array.from({length: focus - items.length - 1});
        }

        return [
            ...leftPhantom,
            ...items.slice(startIndex, startIndex + VISIBLE_SLIDES),
            ...rightPhantom,
        ]
    }, [items, focus])

    const memoSlides = useMemo(() => {
        return phantomItems.map((slide, index) => (
            <div key={`slide${index}`} className={joinClassNames(
                `box${index + 1}`, '' +
                'text-6xl relative',
                slide === undefined && 'hidden',
                index !== SIDE_SLIDES && 'pointer-events-none'
            )}>
                {slide}
            </div>
        ))
    }, [phantomItems])

    return (
        <div className="relative slider-container">
            <div className="slider">
                {memoSlides}
            </div>
            <button disabled={focus <= 0} onClick={prevSlide} className='absolute bottom-10 text-4xl -ml-48'>
                Prev
            </button>
            <button disabled={focus >= items.length - 1} onClick={nextSlide} className='absolute bottom-10 text-4xl -mr-48'>
                Next
            </button>
        </div>
    )
}