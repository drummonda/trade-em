import axios from 'axios'

/**
 * ACTION TYPES
 */
const UPDATE_PRICE = 'UPDATE_PRICE'

/**
 * INITIAL STATE
 */
const defaultData = {
  price: 0,
  incr: null
}

/**
 * ACTION CREATORS
 */
export const updatePrice = price => ({
  type: UPDATE_PRICE,
  price
})

/**
 * REDUCER
 */
export default function(state = defaultData, action) {
  switch (action.type) {

    case UPDATE_PRICE:
      const incr = action.price > state.price;
      return { price: action.price, incr }

    default:
      return state

  }
}