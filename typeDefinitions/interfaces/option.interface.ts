import { optionLabel } from "./optionLabel.interface";

export interface option {
  name: string;
  type: string;
  optionCustomizations: optionLabel[];
  _id: string;
}
