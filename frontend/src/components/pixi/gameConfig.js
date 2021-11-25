import {DEG_TO_RAD} from 'pixi.js-legacy'
export const radius = 300
export const arrowOffset = 15

export function deg2Rad(deg){
  return deg * DEG_TO_RAD
}

export const colorArr = [0x97CBFF, 0xC2FF68, 0xFF5809, 0xFFD306]
export function getColorIndex(index, length){
  const remainder = index % colorArr.length
  // 不是最後一個 or 最後一個但不與第一個重複
  if(index !== length - 1 || remainder !== 0){
      return remainder
  }

  return colorArr.length - 1 - 1      // 倒數第二個
}