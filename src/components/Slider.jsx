import React, {useMemo} from "react";
import joinClassNames from "../helpers/joinClassNames";
import {save} from "../helpers/localStorage";
import {EPISODE_SAVE_KEY} from "../constants/globals";

const VISIBLE_SLIDES = 7;
const SIDE_SLIDES = Math.round(VISIBLE_SLIDES / 2) - 1;

export default function Slider({
    items,
    focus,
    updateFocus
}) {
    const startIndex = focus >= SIDE_SLIDES ? focus - SIDE_SLIDES : 0;

    const prevSlide = () => {
        const nextFocus = +focus - 1;
        updateFocus(nextFocus);
        save(EPISODE_SAVE_KEY, nextFocus);
    }

    const nextSlide = () => {
        const nextFocus = +focus + 1;
        updateFocus(nextFocus);
        save(EPISODE_SAVE_KEY, nextFocus);
    }

    const phantomItems = useMemo(() => {
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
    }, [items, focus, startIndex])

    const memoSlides = useMemo(() => {
        return phantomItems.map((slide, index) => {
            let item = <div/>;

            if (slide) {
                item = slide.item;
            }

            return (
                <div
                    key={`slide${index + 1}`}
                    className={joinClassNames(
                    `box${index + 1}`,
                    'text-6xl relative',
                    index !== SIDE_SLIDES ? 'hidden xl:block pointer-events-none' : '',
                    !slide && '!hidden')
                }>
                    {item}
                    <div className='top-0 fog-top' />
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