import { useEffect, useRef, useState } from "react";
import TakePicture from "./TakePicture";

const Picture = ({ url }) => {
    const picRef = useRef(null)
    const [urlPic, setUrlPic] = useState(url);
    useEffect(() => {
        setUrlPic(picRef.current)
    }, [picRef.current]);
    return (

        <div className="pic bg-[#222] border-[1px] flex justify-center items-center   border-solid border-white w-full min-h-[8rem] p-1 rounded-[10px] mb-2">
            {urlPic ? <img src={urlPic} className="bg-red-500 max-w-full  max-h-full" alt="img by user" /> :
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="6rem" height="6rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M8 12h4V6h3l-5-5l-5 5h3v6zm11.338 1.532c-.21-.224-1.611-1.723-2.011-2.114A1.503 1.503 0 0 0 16.285 11h-1.757l3.064 2.994h-3.544a.274.274 0 0 0-.24.133L12.992 16H7.008l-.816-1.873a.276.276 0 0 0-.24-.133H2.408L5.471 11H3.715c-.397 0-.776.159-1.042.418c-.4.392-1.801 1.891-2.011 2.114c-.489.521-.758.936-.63 1.449l.561 3.074c.128.514.691.936 1.252.936h16.312c.561 0 1.124-.422 1.252-.936l.561-3.074c.126-.513-.142-.928-.632-1.449z" /></svg>
            }
            {/* <TakePicture picURLRef={picRef} /> */}
        </div>);
}

export default Picture;