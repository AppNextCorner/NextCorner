import { ThunkDispatch } from "@reduxjs/toolkit";
import UserAction from "./interfaces/reduxAction.interface";

export type AppDispatch = ThunkDispatch<any, any, UserAction>;