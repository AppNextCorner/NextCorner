import React from "react";

export default interface ITab{
    name: string;
    component: () => React.JSX.Element;
    focusedName: string;
    unfocused: string;
    icon: any;
}