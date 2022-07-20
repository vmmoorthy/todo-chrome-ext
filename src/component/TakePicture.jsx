import { useEffect, useRef, useState } from "react";

const TakePicture = ({ picURLRef, close }) => {
    const video = useRef(null);
    const ref = useRef({ stream: null, canvas: null, mediaRecord: null, a_ref: null });
    const [settings, setSettings] = useState({ width: 0, height: 0 });

    const [TakePicClick, setTakePicClick] = useState(false);

    //get media stream
    useEffect(() => {
        getMedia({ video: true });
    }, []);

    const savePic = () => {
        ref.current.stream.getTracks().forEach(e => e.stop());
        close(false)
        setTakePicClick(false);
    }
    const takePic = async () => {
        if (!TakePicClick) {
            let canvas = ref.current.canvas;
            canvas.getContext('2d').drawImage(video.current, 0, 0, canvas.width, canvas.height);
            let imgURL = canvas.toDataURL('image/jpeg')
            picURLRef(imgURL)
            ref.current.stream.getTracks().forEach(e => e.stop());
            setTakePicClick(true)
        } else {
            await getMedia({ video: true })
            setTakePicClick(false)
        }
    }

    async function getMedia(constraints) {
        let stream = null;

        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            const sett = stream.getTracks()[0].getSettings()
            setSettings({ width: sett.width, height: sett.height })
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
        <div className="popup top-0 left-0 z-10 fixed w-full h-full bg-[#222222b1] flex justify-center items-center">
            <a ref={r => ref.current.a_ref = r} hidden></a>
            <div className="vidCapture text-center shadow[#fff]">
                <canvas width={settings.width} height={settings.height} style={{ display: TakePicClick ? "block" : "none" }} ref={r => ref.current.canvas = r}></canvas>
                <video ref={r => video.current = r} style={{ display: !TakePicClick ? "block" : "none" }} autoPlay></video>

                <button className=' bg-green-400 p-1 mt-2 rounded ' onClick={takePic}>{TakePicClick ? "Retake" : "Take Picture"}</button>
                <button className=' bg-green-400 ml-3 mt-2 p-1 rounded ' onClick={savePic}>Save</button>

            </div>
        </div>
    );
}

export default TakePicture;