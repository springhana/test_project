import Graph from "@/components/graph"
import { IoIosArrowDown } from "react-icons/io"
import { PiGraph } from "react-icons/pi"

import { useState } from "react"
import Graph2 from "@/components/graph2"
import Graph3 from "@/components/graph3"
import Link from "next/link"

export default function Home() {
  const [toggle, setToggle] = useState(true)
  const [version, setVersion] = useState(1)

  return (
    <div>
      {toggle ? (
        <div>
          <div style={{ textAlign: "center", padding: "14px" }}>
            <span
              onClick={() => {
                setVersion(1)
              }}
              style={{ padding: "14px" }}
            >
              version1
            </span>
            <span
              onClick={() => {
                setVersion(2)
              }}
              style={{ padding: "14px" }}
            >
              version2
            </span>
            <span style={{ padding: "14px" }}>
              <Link href={"/image"}>img</Link>
            </span>
          </div>

          {version === 1 ? <Graph /> : null}
          {version === 2 ? <Graph2 /> : null}
        </div>
      ) : (
        <div>
          <Graph3 />
        </div>
      )}

      <div className="btn">
        <button
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          <PiGraph size={20} />
        </button>
      </div>
    </div>
  )
}
