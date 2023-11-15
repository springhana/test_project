import genRandomTree from "@/datasets/random-data"
import dynamic from "next/dynamic"

const ForceGraph3D = dynamic(() => import("react-force-graph-3D"), {
  ssr: false,
})

const Graph3 = () => {
  return (
    <ForceGraph3D
      backgroundColor="#f8f8f8"
      graphData={genRandomTree()}
      nodeLabel={(node) => `${node.id}: ${node.value}`}
      nodeAutoColorBy="user"
      linkDirectionalParticles={1}
      linkColor={(link: any) => {
        // 링크의 색상을 동적으로 설정
        // 예: 링크의 source와 target에 따라 다른 색상 지정
        return "black"
      }}
    />
  )
}

export default Graph3
