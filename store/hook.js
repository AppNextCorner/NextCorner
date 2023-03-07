/**
 * Purpose of File: Make it easier to use the dispatch function without having to make a function for every dispatch
 * Shortcut for useSelector
 */

import { useDispatch, useSelector } from "react-redux";

// It enables to use any action towards the store by adding the action as an argument to the dispatch variable
export const useAppDispatch = () => useDispatch();

// gets to the redux store -> runs the function in the store -> after each dispatch, rerender the component based on the updated values that the state has
export const useAppSelector = useSelector;