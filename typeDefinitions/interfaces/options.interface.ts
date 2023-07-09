export interface IOptionsLabel extends Document {
  label: string;
  selected: boolean;
  optionId: string;
}

export interface IOptions extends Document {
  _id: string;
  name: string;
  type: string;
  optionCustomizations: IOptionsLabel[];
}
