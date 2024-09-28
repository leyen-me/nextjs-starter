import { SITE_TITLE } from "@/contants";

type LogoProps = {
  mode: "square" | "header";
};


const LogoImage = (props: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 275.09 276.71" {...props}>
      <g>
        <g>
          <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="274.59" y1="138.25" x2="274.59" y2="138.02" />
          <path
            fill="currentColor"
            d="M259.92,37,220.15,10.16,207.69,1.75l-.16.11-12.31,8.3-55.3,37.29L82,8.41,69.89.22,69.56,0,57.09,8.4.83,46.34,0,46.9v182l57.44,38.73h0L69.89,276h0l12.47-8.4L138,230.11l69.11,46.6.41-.27,12.06-8.13,40.33-27.2,2.41-1.63h0l12.25-8.26v-93l-.17-.12.17-.11V46.86Zm-190,222.25h0V184.18l55.66,37.53Zm190-38.17-52.39-35.33-1.84-1.24-12.47-8.41L83.66,102.19l-12.47-8.4-1.3-.88L13.3,54.75,69.56,16.81l.33-.22V17l57.57,38.82,12.46,8.41,67.61,45.58V18.46l.16.1,52.23,35.22Z"
          />
        </g>
      </g>
    </svg>
  )
}


export const Logo = ({ mode = "header" }: LogoProps) => {
  return (
    mode === "square" ? (
      <LogoImage style={{ height: "44px", width: "44px" }} />
    ) : (
      <div className="w-auto h-full flex items-center">
        <LogoImage style={{ height: "32px", width: "auto" }} />
        <span className="text-xl font-bold ml-2">{SITE_TITLE}</span>
      </div>
    )
  )
};
