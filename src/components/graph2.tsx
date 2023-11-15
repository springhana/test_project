import { useCallback, useRef, useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import * as d3 from "d3"

import genRandomTree from "@/datasets/random-data"
const ForceGraph2D3 = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
})

// const data = {
//   nodes: [
//     { id: "0" }, // Root node
//     {
//       id: "1",
//       isClusterNode: true,
//       name: "Transport",
//       val: 50,
//       color: "red",
//     },
//     {
//       id: "2",
//       color: "red",
//       val: 1,
//       name: "Bus",
//     },
//     {
//       id: "3",
//       color: "red",
//       name: "Train",
//     },
//     {
//       id: "10",
//       color: "red",
//       name: "Plane",
//     },
//     {
//       id: "4",
//       isClusterNode: true,
//       val: 70,
//       name: "Animal",
//     },
//     {
//       id: "5",
//       name: "Tiger",
//     },
//     {
//       id: "6",
//       name: "Dog",
//     },
//     {
//       id: "7",
//       name: "Wolf",
//     },
//     {
//       id: "8",
//       name: "Elephant",
//     },
//     {
//       id: "9",
//       name: "Cat",
//     },
//     {
//       id: "11",
//       name: "Plant",
//       isClusterNode: true,
//       color: "yellow",
//       val: 30,
//     },
//     {
//       id: "12",
//       name: "Tree",
//       color: "yellow",
//     },
//     {
//       id: "13",
//       name: "Flower",
//       color: "yellow",
//     },
//   ],
//   links: [
//     { source: "0", target: "1" },
//     { source: "1", target: "2" },
//     { source: "1", target: "3" },
//     { source: "1", target: "10" },
//     { source: "4", target: "5" },
//     { source: "4", target: "6" },
//     { source: "4", target: "7" },
//     { source: "4", target: "8" },
//     { source: "0", target: "4" },
//     { source: "4", target: "9" },
//     { source: "11", target: "12" },
//     { source: "11", target: "13" },
//     { source: "0", target: "11" },
//   ],
// }

export default function Graph2() {
  const forceRef: any = useRef()
  const { nodes, links }: any = genRandomTree()
  useEffect(() => {
    const simulation = d3
      .forceSimulation(nodes as any)
      .force("charge", d3.forceManyBody().strength(-200)) // 노드 간의 인력을 0으로 설정하여 위치를 고정
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100),
      ) // 링크의 길이를 설정
  })
  const rootId = "0"

  const nodesById = useMemo(() => {
    const nodesById: any = Object.fromEntries(
      nodes.map((node: any) => [node.id, node]),
    )

    // link parent/children
    nodes.forEach((node: any) => {
      node.collapsed = node.id !== rootId
      node.childLinks = []
    })
    links.forEach((link: any) => nodesById[link.source].childLinks.push(link))

    return nodesById
  }, [])

  const getPrunedTree = useCallback(() => {
    const visibleNodes = []
    const visibleLinks = []
    ;(function traverseTree(node = nodesById[rootId]) {
      visibleNodes.push(node)
      if (node.collapsed) return
      visibleLinks.push(...node.childLinks)
      node.childLinks
        .map((link: any) =>
          typeof link.target === "object"
            ? link.target
            : nodesById[link.target],
        ) // get child node
        .forEach(traverseTree)
    })()

    return { nodes: visibleNodes, links: visibleLinks }
  }, [nodesById])

  const [prunedTree, setPrunedTree] = useState(getPrunedTree())

  const handleNodeClick = useCallback(
    (node: any) => {
      if (node.id !== "0") {
        node.collapsed = !node.collapsed // toggle collapse state
        setPrunedTree(getPrunedTree())
      }
    },
    [getPrunedTree],
  )

  //   const simulation = d3
  //     .forceSimulation(data as any)
  //     .force("charge", d3.forceManyBody().strength(-15))
  //     .force("link", d3.forceLink(links).distance(50))

  return (
    <ForceGraph2D3
      backgroundColor="#f8f8f8"
      ref={forceRef}
      onNodeClick={handleNodeClick}
      graphData={prunedTree}
      nodeAutoColorBy="group"
      nodeCanvasObjectMode={() => "after"}
      nodeCanvasObject={(node: any, ctx: any, globalScale: any) => {
        const label = node.value
        const fontSize = 12 / globalScale
        ctx.font = `${fontSize}px Sans-Serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = "black" //node.color;
        // nodePaint(node, getColor(node.id), ctx)
        if (node.isClusterNode) {
          ctx.fillText(label, node.x, node.y)
        } else {
          ctx.fillText(label, node.x + 20, node.y)
        }
      }}
      //   nodePointerAreaPaint={nodePaint}
      //   nodeVisibility={(node) => node.id !== "0"}
    />
  )
}
