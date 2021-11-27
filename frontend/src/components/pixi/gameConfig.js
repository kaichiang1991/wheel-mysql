import { DEG_TO_RAD, TextStyle} from 'pixi.js-legacy'
export const radius = 300
export const arrowOffset = 40
export const wheelDuration = 1
export const leastSpinDuration = 3
export const revertAngle = 15       // 回拉的角度

export function deg2Rad(deg){
  return deg * DEG_TO_RAD
}

export const colorArr = [0x97CBFF, 0xC2FF68, 0xFF5809, 0xFFD306]
export function getColorIndex(index, length){
  const remainder = index % colorArr.length
  return (index === length - 1 && remainder === 0)? (index - 1) % length: remainder
}

/**
* 取得圓形角度的切點座標
* @param {*} degree 角度(degree)
* @returns 
*/
function getCirclePos(radius, degree){
   const rad = deg2Rad(degree)
   return [Math.cos(rad), Math.sin(rad)].map(num => num * radius)
}

export function getCirclePosWithRadius(degree){
  return getCirclePos(radius, degree)
}

export const textStyle = new TextStyle({
  fontSize: 32
})

export const resultTextStyle = new TextStyle({
  fontSize: 48,
  dropShadow: true,
  dropShadowAlpha: 0.8,
  dropShadowColor: "#32c0c3"
})