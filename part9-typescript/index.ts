const add = (a: number, b: number) => {
  return a + b
}

type CallsFunction = (callback: (result: string) => any) => void

const func: CallsFunction = (cb) => {
  cb('done')
  cb(1)
}

func((result) => {
  return result
})

type Point = {
  x: number
  y: number
}

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}

printCoord({ x: 100, y: 100 })
