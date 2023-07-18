import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IOptions } from "../../../typeDefinitions/interfaces/options.interface";
import { Iitem } from "../../../typeDefinitions/interfaces/item.interface";
import { Draft } from "immer";

interface IEdit {
  customizations: any;
}

interface IMenuCreateState {
  model: Draft<Iitem>;
  customizations: IOptions[];
}

const initialState: IMenuCreateState = {
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
    amountInCart: 0,
    rating: 0,
    storeInfo: {
      storeName: "",
      storeId: "",
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

      state.model.customizations = state.customizations;
    },
    editCustomizations: (state, action: PayloadAction<IEdit>) => {
      const index: number = action.payload.customizations.index;
      // Delete index from structure
      delete action.payload.customizations.index;
      (state.customizations[index] as any) = action.payload.customizations;
      
      // Updated customizations
      state.model.customizations = state.customizations;
    },
  },
});

export const { setModel, setProperty, setCustomizations, editCustomizations } =
  menuCreateSlice.actions;
export const getModel = (state: RootState) => state.menuCreate.model;
export const getCustomizations = (state: RootState) =>
  state.menuCreate.customizations;

export default menuCreateSlice.reducer;
