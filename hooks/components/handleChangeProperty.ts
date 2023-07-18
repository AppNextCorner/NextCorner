import { Dispatch, SetStateAction } from "react";

export const handlePropertyChange = (
  setState: Dispatch<SetStateAction<any>>,
  property: string,
  text: any
) => {
  setState((prevStructure: any) => ({
    ...prevStructure,
    [property]: text,
  }));
};
