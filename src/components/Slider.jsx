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
            rightPhantom = Array.from({length: focus - (items.length - 1)});
        }

        return [
            ...leftPhantom,
            ...items.slice(startIndex, startIndex + VISIBLE_SLIDES),
            ...rightPhantom,
        ]
    }, [items, focus])

    const memoSlides = useMemo(() => {
        return phantomItems.map((slide, index) => {
            let item = <div/>;
            let title = '';

            if (slide) {
                item = slide.item;
                title = slide.title;
            }

            return (
                <div key={`slide${index}`} className={joinClassNames(
                    `box${index + 1}`,
                    'text-6xl relative',
                    index !== SIDE_SLIDES && 'hidden xl:block',
                    !slide && '!hidden',
                    index !== SIDE_SLIDES && 'pointer-events-none')}
                >
                    {item}
                    <div className='pointer-events-none absolute top-0 left-0 w-screen h-[20vh] bg-gradient-to-b from-black to-[0, 0, 0, 0]' />
                    <div className='absolute w-full text-base md:text-xl lg:text-2xl text-center top-0 pointer-events-none truncate px-4'>{title}</div>
                </div>
            )
        })
    }, [phantomItems])

    return (
        <div className="relative slider-container">
            <div className="slider">
                {memoSlides}
            </div>
            <button
                onClick={prevSlide}
                className={joinClassNames(
                    'button left-8',
                    focus <= 0 && 'hidden'
                )}
            >
                Prev
            </button>
            <button
                onClick={nextSlide}
                className={joinClassNames(
                    'button right-8',
                    focus >= items.length - 1 && 'hidden'
                )}
            >
                Next
            </button>
        </div>
    )
}