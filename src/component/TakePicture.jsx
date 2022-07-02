import { useEffect, useRef, useState } from "react";

const TakePicture = ({ picURLRef }) => {
    const video = useRef(null);
    const ref = useRef({ stream: null, canvas: null, mediaRecord: null, a_ref: null });

    const [TakePicClick, setTakePicClick] = useState(false);

    //get media stream
    useEffect(() => {
        getMedia({ video: true });
    }, []);

    const savePic = () => {
        ref.current.stream.getTracks().forEach(e => e.stop());
        setTakePicClick(false);
    }
    const takePic = () => {
        let canvas = ref.current.canvas;
        canvas.getContext('2d').drawImage(video.current, 0, 0, canvas.width, canvas.height);
        let imgURL = canvas.toDataURL('image/jpeg')
        console.log(imgURL);
        picURLRef.current = imgURL
        setTakePicClick(true)
    }

    async function getMedia(constraints) {
        let stream = null;

        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.current.srcObject = stream;
            ref.current.stream = stream;
            /* use the stream */
        } catch (err) {
            /* handle the error */
            console.log(err);
        }
    }
    const startRecord = () => {

        const mediaRecord = new MediaRecorder(ref.current.stream, { mimeType: 'video/webm' });
        ref.current.mediaRecord = mediaRecord
        mediaRecord.addEventListener('dataavailable', (e) => ref.current.blob.push(e.data));
        mediaRecord.addEventListener('stop', e => {
            const videoL = URL.createObjectURL(new Blob(ref.current.blob, { type: 'video/webm' }))
            ref.current.a_ref.href = videoL;
            ref.current.a_ref.download = "Hello.webm";
            ref.current.a_ref.click();
        });
        mediaRecord.start();
        setTakePicClick(true);
    }
    const stopRecord = () => {
        ref.current.mediaRecord.stop();
        setTakePicClick(false);
    }
    const exitModel = () => {
        // ref.current.mediaRecord.stop();
        // ref.current.stream.
        ref.current.stream.getTracks().forEach(e => e.stop());
        setTakePicClick(false);
    }

    return (
        <div className="popup top-0 left-0 fixed w-screen h-screen bg-[#222222b1] flex justify-center items-center">
            <a ref={r => ref.current.a_ref = r} hidden></a>
            <div className="vidCapture text-center shadow-slate-200">
                <canvas width={320} height={240} style={{ visibility: TakePicClick ? "visible" : "hidden" }} ref={r => ref.current.canvas = r}></canvas>
                <video ref={r => video.current = r} style={{ visibility: !TakePicClick ? "visible" : "hidden" }} autoPlay></video>

                <button className=' bg-slate-50 p-1 rounded ' onClick={takePic}>Take Picture</button>
                <button className=' bg-slate-50 p-1 rounded ' onClick={savePic}>Save</button>

            </div>
        </div>
    );
}

export default TakePicture;