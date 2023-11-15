import ForceGraph2D from "react-force-graph-2d"

import genRandomTree from "@/datasets/random-data"

import { useCallback } from "react"
import dynamic from "next/dynamic"
const Graph2 = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
})

export default function Graph() {
  function nodePaint({ id, x, y }: any, color: any, ctx: any) {
    ctx.fillStyle = color
    ;[
      //   () => {
      //     ctx.fillRect(x - 6, y - 4, 12, 8)
      //   }, // rectangle
      //   () => {
      //     ctx.beginPath()
      //     ctx.moveTo(x, y - 5)
      //     ctx.lineTo(x - 5, y + 5)
      //     ctx.lineTo(x + 5, y + 5)
      //     ctx.fill()
      //   }, // triangle
      () => {
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, 2 * Math.PI, false)
        ctx.fill()
      }, // circle
      //   () => {
      //     ctx.font = "10px Sans-Serif"
      //     ctx.textAlign = "center"
      //     ctx.textBaseline = "middle"
      //     ctx.fillText("Text", x, y)
      //   }, // text
    ][0]()
  }

  const getColor = (n: any) =>
    "#" + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0")

  console.log(genRandomTree())
  const handler = useCallback((node: any) => {
    console.log(node)
  }, [])
  return (
    <div>
      <Graph2
        graphData={genRandomTree()}
        nodeLabel="id"
        nodeCanvasObject={(node, ctx) => {
          const label = node.value as string
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillStyle = "black" //node.color;
          nodePaint(node, getColor(node.id), ctx)
          if (node.isClusterNode) {
            ctx.fillText(label, (node.x as any) + 20, node.y as any)
          } else {
            ctx.fillText(label, (node.x as any) + 20, node.y as any)
          }
        }}
        nodePointerAreaPaint={nodePaint}
        onNodeClick={(node) => {
          handler(node.value)
        }}
      />
    </div>
  )
}
