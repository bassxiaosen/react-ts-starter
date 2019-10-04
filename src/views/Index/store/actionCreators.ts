import { ADD_TODO_ITEM, DELETE_TODO_ITEM, CHANGE_INPUT_VALUE } from './actionTypes'

export function addTodoItem() {
  return {
    type: ADD_TODO_ITEM
  }
}

export function deleteTodoItem(index:number) {
  return {
    type: DELETE_TODO_ITEM,
    index
  }
}

export function changeInputValue(inputValue:any) {
  return {
    type: CHANGE_INPUT_VALUE,
    inputValue
  }
}