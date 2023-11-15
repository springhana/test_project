const user = {
  맛집: [
    { space: "울산", value: "고래" },
    { space: "울산", value: "피자" },
    { space: "울산", value: "치킨" },
  ],
  운동: [
    { space: "헬스", value: "스쿼트" },
    { space: "헬스", value: "벤치프레스" },
    { space: "헬스", value: "데드리프트" },
    { space: "헬스", value: "바벨컬" },
    { space: "헬스", value: "레그프레스" },
  ],
}

export default function genRandomTree() {
  return {
    nodes: [
      { id: "0", value: "성환" },
      {
        id: "1",
        value: "맛집",
        isClusterNode: true,
        val: user.맛집.length * 5,
        color: getColor(1),
      },
      { id: "2", value: "서울", color: getColor(1) },
      { id: "3", value: "울산", color: getColor(1) },
      {
        id: "4",
        value: "운동",
        isClusterNode: true,
        val: user.운동.length * 5,
        color: getColor(4),
      },
      { id: "5", value: "헬스", color: getColor(4) },
    ],
    links: [
      { source: "0", target: "1" },
      { source: "0", target: "4" },
      { source: "1", target: "2" },
      { source: "1", target: "3" },
      { source: "4", target: "5" },
    ],
  }
}
const getColor = (n) =>
  "#" + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0")
