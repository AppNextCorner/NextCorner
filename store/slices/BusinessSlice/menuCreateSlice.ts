import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IOptions } from "../../../typeDefinitions/interfaces/options.interface";
import { Iitem } from "../../../typeDefinitions/interfaces/item.interface";
import { Draft } from "immer";

export interface IEditMyMenuCreateState {
  model: Draft<Iitem>;
  customizations: IOptions[];
}

// TODO: Fix this
const initialState: IEditMyMenuCreateState = {
  model: {
    name: "",
    time: {
      minutes: 0,
      seconds: 0,
    },
    image: "",
    price: 0,
    description: "",
    customizations: [],
    category: "",
    featured: false,
    amountInCart: 1,
    rating: 0,
    storeInfo: {
      storeName: "",
      storeId: "",

      // selector and dispatch
    },
  },
  customizations: [],
};

export const menuCreateSlice = createSlice({
  name: "menuCreate",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<Iitem>) => {
      state.model = action.payload as Draft<Iitem>;
    },
    setProperty: (
      state,
      action: PayloadAction<{
        property: keyof Iitem;
        value: Iitem[keyof Iitem];
      }>
    ) => {
      const { property, value } = action.payload;
      (state.model[property] as any) = value;
    },
    setCustomizations: (state, action: PayloadAction<IOptions[]>) => {
      state.customizations = action.payload as Draft<IOptions[]>;

      // state.model.customizations = state.customizations;
      console.log('state customizations', state.model.customizations);
    },
    setModelCustomizations: (state) => {
      state.model.customizations = state.customizations
    }
  },
});

export const { setModel, setProperty, setCustomizations, setModelCustomizations } =
  menuCreateSlice.actions;
export const getModel = (state: RootState) => state.menuCreate.model;
export const getCustomizations = (state: RootState) =>
  state.menuCreate.customizations;

export default menuCreateSlice.reducer;
