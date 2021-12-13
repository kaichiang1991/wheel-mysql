import { atom, selector } from 'recoil'

const prod = process.env.NODE_ENV === 'production'

export const prizeLists = atom({
  key: 'prizeLists',
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
  key: 'currentListState',
  default: prod? '': '清單1'
})

export const toPlayWheel = atom({
  key: 'toPlayWheel',
  default: false
})