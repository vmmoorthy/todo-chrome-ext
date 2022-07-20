import { useEffect, useRef, useState } from "react";

const RecordAudio = ({ setUrlAud }) => {
    const video = useRef(null);
    const [blobD, setBlobD] = useState(null);
    const ref = useRef({ stream: null, blob: [], mediaRecord: null, a_ref: null });

    const [sRecord, setSRecord] = useState(false);

    //get media stream
    // useEffect(() => {
    //     getMedia({ video: true, audio: true });
    // }, []);

    async function getMedia(constraints) {
        let stream = null;

        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            // video.current.srcObject = stream;
            ref.current.stream = stream;
            /* use the stream */
        } catch (err) {
            /* handle the error */
            console.log(err);
        }
    }
    const startRecord = async () => {
        await getMedia({ audio: true });
        const mediaRecord = new MediaRecorder(ref.current.stream, { mimeType: 'audio/webm' });
        ref.current.mediaRecord = mediaRecord
        mediaRecord.addEventListener('dataavailable', (e) => ref.current.blob.push(e.data));
        mediaRecord.addEventListener('stop', async e => {
            const blob = new Blob(ref.current.blob, { type: 'audio/webm' })
            console.log(blob)

            // const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setBlobD(reader.result)
                // inputRef.current.value = ""
            }

            // console.log(await blob.text());
            // const videoL = URL.createObjectURL(blob)
            // ref.current.a_ref.href = videoL;
            // console.log(videoL);
            // ref.current.a_ref.download = "Hello.webm";
            // ref.current.a_ref.click();
        });
        mediaRecord.start();
        setSRecord(true);
    }
    const stopRecord = () => {
        ref.current.mediaRecord.stop();
        ref.current.stream.getTracks().forEach(e => e.stop());
        setSRecord(false);
    }
    const exitModel = () => {
        // ref.current.mediaRecord.stop();
        // ref.current.stream.
        setUrlAud(blobD)
        ref.current.stream.getTracks().forEach(e => e.stop());
        setSRecord(false);
    }

    return (
        <div className="popup left-0 top-0 z-10 fixed w-screen h-screen bg-[#2225] flex justify-center items-center">
            {/* <a ref={r => ref.current.a_ref = r} hidden></a> */}
            <div className="vidCapture text-center">
                {/* <video ref={r => video.current = r} autoPlay></video> */}
                {blobD && <audio src={blobD} controls></audio>}
                {sRecord ? <button className=' bg-green-400 p-1 rounded ' onClick={stopRecord}>Stop recording</button> :
                    <button className=' bg-green-400 p-1 m-2 rounded ' onClick={startRecord}>{blobD ? "Rerecord" : "Start recording"}</button>}
                <button className=' bg-green-400 p-1 m-2 rounded ' onClick={exitModel}>Exit</button>
            </div>
        </div>
    );
}

export default RecordAudio;