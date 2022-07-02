import './App.css';
import TodoList from "./component/TodoList";
import Text from "./component/Text";
import Picture from "./component/Picture";
import Audio from "./component/Audio";
import Video from "./component/Video";
import { useEffect, useRef, useState } from 'react';
import RecordVideo from './component/RecordVideo';
import TextInput from './component/TextInput';

const App = () => {

    // show record video
    // const [showRV, setShowRV] = useState(false);

    // const debounceTimer = useRef(0);

    // const [titleInput, setTitleInput] = useState("Title");

    // const gatherInput = (e, cb) => {

    //     function debounce() {
    //         debounceTimer.current = setTimeout(() => {
    //             // call back goes here
    //             console.log(e.target.innerText);
    //             setTitleInput(e.target.innerText);
    //         }, 2000);
    //     }

    //     clearTimeout(debounceTimer.current);
    //     debounce();
    // }

    return (
        //app container
        <div className="bg-[#222222] w-full h-screen grid grid-flow-row grid-rows-[.8fr_9.2fr]">
            {/* app title container */}
            {/* {showRV && <RecordVideo />} */}
            <div className="w-full  "></div>
            <div className="w-full  grid grid-flow-col grid-cols-[19fr_1fr]">
                {/* todo list container */}
                <div className="grid  grid-flow-col m-1 p-4 gap-4 h-[80%] overflow-auto">
                    <div className="rounded-[20px] w-80 m-2 text-white bg-[#8D3DAF] relative ">
                        <div className="addToolsModel bg-[#6A1B4D] absolute p-2 rounded-[8px] right-[-3rem] top-4 flex flex-col gap-4">
                            {/* Notes */}
                            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 36H30V32H6V36ZM6 12V16H42V12H6ZM6 26H42V22H6V26Z" fill="white" />
                            </svg>
                            {/* check box todo */}
                            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26 17.9996V13.9996H44V17.9996H26ZM26 33.9996V29.9996H44V33.9996H26ZM11.1 21.9996L4 14.8996L6.8 12.0996L11.05 16.3496L19.55 7.84961L22.35 10.6996L11.1 21.9996ZM11.1 37.9996L4 30.8996L6.8 28.0996L11.05 32.3496L19.55 23.8496L22.35 26.6996L11.1 37.9996Z" fill="white" />
                            </svg>

                            {/* picture */}
                            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M38 6H10C7.794 6 6 7.794 6 10V38C6 40.206 7.794 42 10 42H38C40.206 42 42 40.206 42 38V10C42 7.794 40.206 6 38 6ZM10 38V10H38L38.004 38H10Z" fill="white" />
                                <path d="M20 28L18 26L12 34H36L26 20L20 28Z" fill="white" />
                            </svg>

                            {/* Audio */}
                            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.7996 4.7998L38.3996 14.3998V43.1998H9.59961V4.7998H28.7996ZM28.7996 14.3998H35.9996L28.7996 7.1998V14.3998ZM31.1996 31.8238V19.4158C31.201 19.2864 31.1762 19.158 31.1267 19.0384C31.0772 18.9188 31.0041 18.8104 30.9116 18.7198C30.8324 18.6287 30.7315 18.5589 30.6183 18.517C30.505 18.475 30.3831 18.4623 30.2636 18.4798C30.2636 18.4798 20.7356 20.1838 20.0636 20.3518C19.3676 20.4958 19.1996 21.1198 19.1996 21.5998V29.6878C18.7196 29.4718 18.1916 29.5198 17.7596 29.5198C16.8476 29.5198 16.0796 29.8318 15.4556 30.4558C14.8316 31.1038 14.4956 31.8478 14.4956 32.7598C14.4956 33.6478 14.8316 34.4158 15.4556 35.0398C16.0796 35.6878 16.8476 35.9998 17.7596 35.9998C18.5756 35.9998 19.4396 35.9038 20.0636 35.3758C20.6876 34.8238 21.5996 33.8158 21.5996 32.6878V24.7198L28.7996 23.2798V28.7998C27.1916 28.3198 25.9916 28.8958 25.3436 29.5438C24.7196 30.1678 24.4076 30.9358 24.4076 31.8238C24.4076 32.7358 24.7196 33.4798 25.3436 34.1278C25.9916 34.7518 27.0476 35.0638 27.9356 35.0638C28.8476 35.0638 29.6156 34.7518 30.2396 34.1278C30.8636 33.4798 31.1996 32.7358 31.1996 31.8238V31.8238Z" fill="white" />
                            </svg>

                            {/* video */}
                            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36 8H12C7.58172 8 4 11.5817 4 16V32C4 36.4183 7.58172 40 12 40H36C40.4183 40 44 36.4183 44 32V16C44 11.5817 40.4183 8 36 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M30 24L20 18V30L30 24Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>


                        </div>
                        <TextInput />
                        {/* <h1 suppressContentEditableWarning contentEditable onInput={gatherInput} className="title font-bold text-3xl p-2">
                            {titleInput}
                        </h1> */}
                        <div className="listContainer">
                            <div className="list w-full h-[95%] p-1">
                                <Text />
                                <TodoList />
                                {/* <Picture url={"https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80"} />
                                <Audio />
                                <Video /> */}

                                {/* <div className="text"></div>
                                <div className="todoList"></div>
                                <div className="pic"></div>
                                <div className="aud"></div>
                                <div className="vid"></div> */}
                            </div>

                        </div>
                    </div>


                </div>


                {/* option bar container */}
                <div className="bg-[#23C4ED] border-white overflow-auto border-solid rounded-[18px] border-[1px] max-w-10 p-2 h-[95%] mr-2">
                    {/* notes */}
                    <div title="Notes" tabIndex={0} className="icon p-2 py-7 w-full my-2  rounded-[18px] h-[50px] flex justify-center items-center hover:bg-[#46B2E0] cursor-pointer focus:bg-[#1B98F5]">
                        <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.84965 11.0494H31.1496M8.84965 18.5394H31.1496M8.84965 26.0294H31.1496M8.84965 33.5294H31.1496M11.6396 1.50941C11.2677 1.48263 10.8943 1.53617 10.5449 1.66641C10.1955 1.79665 9.87815 2.00053 9.61446 2.26422C9.35077 2.52791 9.14689 2.84524 9.01665 3.19467C8.88641 3.5441 8.83287 3.91746 8.85965 4.28941H6.07965C5.7056 4.25921 5.32945 4.31066 4.97725 4.4402C4.62505 4.56973 4.3052 4.77425 4.03984 5.0396C3.77449 5.30496 3.56997 5.62481 3.44044 5.97701C3.3109 6.32921 3.25945 6.70536 3.28965 7.07941V37.7094C3.26098 38.0827 3.31357 38.4577 3.44378 38.8087C3.574 39.1596 3.77875 39.4782 4.04393 39.7424C4.30911 40.0067 4.62841 40.2103 4.97985 40.3392C5.33129 40.4682 5.7065 40.5194 6.07965 40.4894H33.9196C34.2928 40.5194 34.668 40.4682 35.0194 40.3392C35.3709 40.2103 35.6902 40.0067 35.9554 39.7424C36.2205 39.4782 36.4253 39.1596 36.5555 38.8087C36.6857 38.4577 36.7383 38.0827 36.7096 37.7094V7.07941C36.7398 6.70536 36.6884 6.32921 36.5589 5.97701C36.4293 5.62481 36.2248 5.30496 35.9595 5.0396C35.6941 4.77425 35.3743 4.56973 35.022 4.4402C34.6698 4.31066 34.2937 4.25921 33.9196 4.28941H31.1396C31.1396 0.579409 25.5696 0.579409 25.5696 4.28941H14.4296C14.4566 3.91656 14.4028 3.54228 14.272 3.19209C14.1412 2.8419 13.9364 2.52404 13.6716 2.26018C13.4068 1.99632 13.0882 1.79266 12.7375 1.6631C12.3869 1.53354 12.0124 1.48112 11.6396 1.50941V1.50941Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    {/* timer */}
                    <div title="Timer" tabIndex={0} className="icon p-2 py-7 w-full my-2  rounded-[18px] h-[50px] flex justify-center items-center hover:bg-[#46B2E0] cursor-pointer focus:bg-[#1B98F5]">
                        <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 42C28.8366 42 36 34.8366 36 26C36 17.1634 28.8366 10 20 10C11.1634 10 4 17.1634 4 26C4 34.8366 11.1634 42 20 42Z" stroke="white" strokeWidth="4" />
                            <path d="M24 2H16M20 2V10M31 14L34 11M20 26V20M20 26H14" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    {/* priority */}
                    <div title="Priority" tabIndex={0} className="icon p-2 py-7 w-full my-2  rounded-[18px] h-[50px] flex justify-center items-center hover:bg-[#46B2E0] cursor-pointer focus:bg-[#1B98F5]">
                        <svg width="40" height="40" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 33.4961H38.75V35.9961H20V33.4961ZM20 25.1627H38.75V27.6627H20V25.1627ZM20 16.8295H38.75V19.3295H20V16.8295ZM25.625 8.49609H38.75V10.9961H25.625V8.49609Z" fill="white" />
                            <path d="M23.5938 9.6677L13.0625 3.12207V8.49582H12.5965C9.5143 8.49582 6.63359 9.96105 4.48438 12.6216C2.39844 15.2041 1.25 18.6221 1.25 22.2458C1.25 25.8696 2.39844 29.2875 4.48438 31.87C6.63359 34.5306 9.5143 35.9958 12.5962 35.9958H16.875V33.4958H12.5962C7.71875 33.4958 3.75 28.4489 3.75 22.2458C3.75 16.0427 7.71875 10.9958 12.5962 10.9958H13.0625V16.4043L23.5938 9.6677ZM15.5625 7.61957L18.9062 9.69824L15.5625 11.8374V7.61957Z" fill="white" />
                        </svg>
                    </div>
                    {/* add todo list */}
                    <div title='Add' tabIndex={0} className="icon p-2 py-7 w-full my-2  rounded-[18px] h-[50px] flex justify-center items-center hover:bg-[#46B2E0] cursor-pointer focus:bg-[#1B98F5]">
                        <svg width="40" height="40" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35 3.49609C35.663 3.49609 36.2989 3.75949 36.7678 4.22833C37.2366 4.69717 37.5 5.33305 37.5 5.99609V35.9961C37.5 36.6591 37.2366 37.295 36.7678 37.7639C36.2989 38.2327 35.663 38.4961 35 38.4961H5C4.33696 38.4961 3.70107 38.2327 3.23223 37.7639C2.76339 37.295 2.5 36.6591 2.5 35.9961V5.99609C2.5 5.33305 2.76339 4.69717 3.23223 4.22833C3.70107 3.75949 4.33696 3.49609 5 3.49609H35ZM5 0.996094C3.67392 0.996094 2.40215 1.52288 1.46447 2.46056C0.526784 3.39824 0 4.67001 0 5.99609L0 35.9961C0 37.3222 0.526784 38.5939 1.46447 39.5316C2.40215 40.4693 3.67392 40.9961 5 40.9961H35C36.3261 40.9961 37.5979 40.4693 38.5355 39.5316C39.4732 38.5939 40 37.3222 40 35.9961V5.99609C40 4.67001 39.4732 3.39824 38.5355 2.46056C37.5979 1.52288 36.3261 0.996094 35 0.996094L5 0.996094Z" fill="white" />
                            <path d="M20 10.9961C20.3315 10.9961 20.6495 11.1278 20.8839 11.3622C21.1183 11.5966 21.25 11.9146 21.25 12.2461V19.7461H28.75C29.0815 19.7461 29.3995 19.8778 29.6339 20.1122C29.8683 20.3466 30 20.6646 30 20.9961C30 21.3276 29.8683 21.6456 29.6339 21.88C29.3995 22.1144 29.0815 22.2461 28.75 22.2461H21.25V29.7461C21.25 30.0776 21.1183 30.3956 20.8839 30.63C20.6495 30.8644 20.3315 30.9961 20 30.9961C19.6685 30.9961 19.3505 30.8644 19.1161 30.63C18.8817 30.3956 18.75 30.0776 18.75 29.7461V22.2461H11.25C10.9185 22.2461 10.6005 22.1144 10.3661 21.88C10.1317 21.6456 10 21.3276 10 20.9961C10 20.6646 10.1317 20.3466 10.3661 20.1122C10.6005 19.8778 10.9185 19.7461 11.25 19.7461H18.75V12.2461C18.75 11.9146 18.8817 11.5966 19.1161 11.3622C19.3505 11.1278 19.6685 10.9961 20 10.9961Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;