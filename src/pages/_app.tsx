import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { IoIosArrowDown } from "react-icons/io"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <div className="A">
          <span>테스트</span>
          <input type="text" className="search" />
        </div>

        <div className="B">
          <button>로그인</button>
          <span>
            <div className="image"></div>
            <div>
              <div className="profile">프로필</div>
              <IoIosArrowDown />
            </div>
          </span>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  )
}
