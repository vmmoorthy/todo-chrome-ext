import { useEffect, useRef, useState } from "react";

const RecordVideo = () => {
    const video = useRef(null);
    const ref = useRef({ stream: null, blob: [], mediaRecord: null, a_ref: null });

    const [sRecord, setSRecord] = useState(false);

    //get media stream
    useEffect(() => {
        getMedia({ video: true, audio: true });
    }, []);

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
        setSRecord(true);
    }
    const stopRecord = () => {
        ref.current.mediaRecord.stop();
        setSRecord(false);
    }
    const exitModel = () => {
        // ref.current.mediaRecord.stop();
        // ref.current.stream.
        ref.current.stream.getTracks().forEach(e => e.stop());
        setSRecord(false);
    }

    return (
        <div className="popup fixed w-screen h-screen bg-[#2225] flex justify-center items-center">
            <a ref={r => ref.current.a_ref = r} hidden></a>
            <div className="vidCapture text-center">
                <video ref={r => video.current = r} autoPlay></video>
                {sRecord ? <button className=' bg-slate-50 p-1 rounded ' onClick={stopRecord}>Stop recording</button> :
                    <button className=' bg-slate-50 p-1 m-2 rounded ' onClick={startRecord}>Start recording</button>}
                <button className=' bg-slate-50 p-1 m-2 rounded ' onClick={exitModel}>Exit</button>
            </div>
        </div>
    );
}

export default RecordVideo;