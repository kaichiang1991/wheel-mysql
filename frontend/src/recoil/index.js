import { atom, selector } from 'recoil'

export const prizeLists = atom({
  key: 'prizeList',
  default: []
})

export const prizeListInFormData = selector({
  key: 'prizeListInFormData',
  get: ({get}) =>{
    const lists = get(prizeLists)
    return lists.map((list, index) => ({...list, key: index}))
  }
})

export const currentListState = atom({
  key: 'currentList',
  default: ''
})