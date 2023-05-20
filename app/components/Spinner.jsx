import React from "react";
import joinClassNames from "../helpers/joinClassNames";

export default function Spinner({
    isLoaded
}) {
    return (
        <div className={joinClassNames("out", isLoaded && 'hidden')}>
            <div className="fade-in">
                <div className="container">
                    <div className="one common"></div>
                    <div className="two common"></div>
                    <div className="three common"></div>
                    <div className="four common"></div>
                    <div className="five common"></div>
                    <div className="six common"></div>
                    <div className="seven common"></div>
                    <div className="eight common"></div>
                </div>
            </div>
        </div>
    )
}