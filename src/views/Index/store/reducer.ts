import { ADD_TODO_ITEM, DELETE_TODO_ITEM, CHANGE_INPUT_VALUE } from './actionTypes'
import { IStoreState, IAction } from './types'

const defaultState:IStoreState = {
  inputValue: '',
  list: []
}

function reducer(state:IStoreState = defaultState, action:IAction):IStoreState {
  if(action.type === ADD_TODO_ITEM) {
    const stateCopy = {...state}
    const listCopy = state.list.slice()
    listCopy.push(stateCopy.inputValue)
    stateCopy.inputValue = ''
    return {
      ...stateCopy,
      list: listCopy
    }
  }

  else if(action.type === DELETE_TODO_ITEM) {
    const listCopy = state.list.slice()
    const { index } = action
    listCopy.splice(index, 1)
    return {
      ...state,
      list: listCopy
    }
  }

  else if(action.type === CHANGE_INPUT_VALUE) {
    const stateCopy = {...state}
    const { inputValue } = action
    stateCopy.inputValue = inputValue
    return stateCopy
  }
  
  else {
    return defaultState
  }
}

export default reducer