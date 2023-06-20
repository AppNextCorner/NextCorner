import { auth } from '../../App'
import { useAppDispatch} from '../../store/hook'
import {
  addOrder,
  getOrderList,
  updateOrderStatus,
  updateOrderStatusReducer
} from '../../store/slices/addToOrders'

/**
 * After the user has entered the order, they should update the order list through the request to our backend. 
 * - Be able to grab the order list from the backend when the function is called asynchronously
 * - The order is added
 *  
 */
const UseOrders = () => {
  const dispatch = useAppDispatch()

// going to run asynchronously when the order is fetched from the home page and/or the user has been logged in/ order page is fetched
  const getCurrentOrder = async () => {
    try {
      await dispatch(getOrderList())
    } catch (err) {
      console.error('Failed to save the post', err)
    }
  }
/**
 * addCartToOrder - after user has confirmed the order, we can grab the order and send a request to the server
 * @param {*} singleOrderList - Contains 
 */
  const addCartToOrder = async (singleOrderList) => {
    // multiply a single order item with the time it takes to complete and the amount it has
    const orderItemTimes = singleOrderList
      .map((order) => order.cartData)
      .map((time) => time.time * time.amountInCart)
    // add up all the previous cart items times together to make one single order time
    let sumOfTimes = orderItemTimes.reduce(function (a, b) {
      return a + b
    })
    const orderList = {
      singleOrderList: singleOrderList,
      timer: sumOfTimes,
      orderStatus: 'In Progress', // initial order status when first made
      userId: auth.currentUser.uid,
    }
    try {
      await dispatch(addOrder(orderList))
    } catch (e) {
      console.log(e)
    }
  }
/**
 * The function runs when the timer has reached zero causing the order status to be changed and put into a new state with the completed orders.
 * @param {*} updatedStatus - the updated value of the order status in our order
 * 
 */
  const updateOrder = async (updatedStatus) => {

      const itemStatus = {
        status: updatedStatus.orderStatus,
        id: updatedStatus.id,
      }
      try{
        // change the state of the order status through the global state to display the order status
        dispatch(updateOrderStatusReducer(itemStatus))
        // send in axios put request to change the status whether the order is completed or no in our backend
        dispatch(updateOrderStatus(itemStatus))
    } catch (e) {
      console.log(e)
    }
  }

  return {
    addCartToOrder,
    getCurrentOrder,
    updateOrder,
  }
}

export default UseOrders
