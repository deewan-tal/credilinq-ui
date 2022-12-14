import React from "react";

export interface ISectionBar {
    name: string
}
export function Section(props: ISectionBar) {
    return (
        <div className="sectionBar">
            {props.name}
        </div>
    )
}