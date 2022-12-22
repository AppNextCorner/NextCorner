import { useState } from 'react'
import { DEFAULT_TENDING_DATA, DEFAULT_CATEGORY_DATA, SET_ORDER_BUTTON} from '../constants/MenuData';
export default function useFoodItemData() {
  const [categoryList, setCategoryList] = useState(DEFAULT_CATEGORY_DATA);
  const [trendingFood, setTrendingFood] = useState(DEFAULT_TENDING_DATA);
  
  return {
    categoryList,
    setCategoryList,
    trendingFood,
    setTrendingFood,
    
  }
}
