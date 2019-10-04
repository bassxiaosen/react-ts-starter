export interface IStoreState {
  readonly inputValue:string,
  readonly list:Array<any>
}

export interface IAction {
  type:string,
  payload?:any,
  index?:any|string|number,
  inputValue?:any
}