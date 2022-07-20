import { useRef, useState } from "react";

const RecordAudio = ({ setUrlAud }) => {
    const [blobD, setBlobD] = useState(null);
    const ref = useRef({ stream: null, blob: [], mediaRecord: null, timer: 1, timerCanceller: null });

    const [sRecord, setSRecord] = useState(false);
    const [timer, setTimer] = useState("00:00");

    async function getMedia(constraints) {
        let stream = null;
        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
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
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setBlobD(reader.result)
            }
        });
        mediaRecord.start();
        setSRecord(true);
        ref.current.timerCanceller = setInterval(() => {
            setTimer(`${Math.floor(ref.current.timer / 60)}:${ref.current.timer % 60 < 10 ? "0" + ref.current.timer % 60 : ref.current.timer % 60}`)
            ref.current.timer += 1;
        }, 1000);
    }
    const stopRecord = () => {
        ref.current.mediaRecord.stop();
        ref.current.stream.getTracks().forEach(e => e.stop());
        setSRecord(false);
        //resetting timer
        clearInterval(ref.current.timerCanceller);
        ref.current.timer = 1;
    }
    const exitModel = () => {
        setUrlAud(blobD)
        ref.current.stream.getTracks().forEach(e => e.stop());
        setSRecord(false);
    }

    return (
        <div className="popup left-0 top-0 z-10 fixed w-screen h-screen bg-[#2225] flex justify-center items-center">
            <div className="vidCapture text-center">
                {sRecord && <h1>{timer}</h1>}
                {blobD && <audio src={blobD} controls></audio>}
                {sRecord ? <button className=' bg-green-400 p-1 rounded ' onClick={stopRecord}>Stop recording</button> :
                    <button className=' bg-green-400 p-1 m-2 rounded ' onClick={startRecord}>{blobD ? "Rerecord" : "Start recording"}</button>}
                {!sRecord && <button className=' bg-green-400 p-1 m-2 rounded ' onClick={exitModel}>Exit</button>}
            </div>
        </div>
    );
}

export default RecordAudio;