import { useState } from "react";
export default function useCategoryList() {
  // did we select an item - category
  const [categoryWasSelected, setCategoryWasSelected] = useState(false);
  // what category did we select
  const [itemId, setItemId] = useState(0);
  
  const [checkForStyleChange, setCheckForStyleChange] = useState(false);

  // shows item when category is selected and compares the id of the category with the id's of every card in the category list
  function onSelectCategory(id) {
    // want to check if the pressed category is the same as the selected category
    // if it is the same then the state of categoryWasSelected should be false because this is the initial state of the category list
    if (itemId === id) {
      setCategoryWasSelected(false);
      setItemId(0);
      setCheckForStyleChange(false);

      // setting to true because the id is already selected when the category is selected -> meaning that the if the id is not selected to a new value and is the same as the current value of itemId, then go back to default because the category was selected twice -> until the new value is selected by the newId / category
      //
    } else {
      onSelectCategory;
      setItemId(id);
      setCategoryWasSelected(true);
      setCheckForStyleChange(true);
    }
  }

  return {
    categoryId: itemId,
    categoryWasSelected,
    checkForStyleChange,
    onSelectCategory,
  };
}
