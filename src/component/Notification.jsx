const Notification = ({ content = "", type = "info" }) => {
    return (
        <div className="min-w-[20rem] max-w-xl rounded-lg text-white  border-white border-1 p-1 pr-0 m-3 absolute right-0 bg-[#6A1B4D] min-h-[3rem] max-h-[5rem] overflow-auto">
            <div className="w-6 h-6  sticky right-[1px] float-right">
                <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M685.4 354.8C685.4 350.4 681.8 346.8 677.4 346.8L611.4 347.1L512 465.6L412.7 347.2L346.6 346.9C342.2 346.9 338.6 350.4 338.6 354.9C338.6 356.8 339.3 358.6 340.5 360.1L470.6 515.1L340.5 670C339.292 671.465 338.621 673.3 338.6 675.2C338.6 679.6 342.2 683.2 346.6 683.2L412.7 682.9L512 564.4L611.3 682.8L677.3 683.1C681.7 683.1 685.3 679.6 685.3 675.1C685.3 673.2 684.6 671.4 683.4 669.9L553.5 515L683.6 360C684.8 358.6 685.4 356.7 685.4 354.8Z" fill="white" />
                    <path d="M512 65C264.6 65 64 265.6 64 513C64 760.4 264.6 961 512 961C759.4 961 960 760.4 960 513C960 265.6 759.4 65 512 65ZM512 885C306.6 885 140 718.4 140 513C140 307.6 306.6 141 512 141C717.4 141 884 307.6 884 513C884 718.4 717.4 885 512 885Z" fill="white" />
                </svg>

            </div>
            <div className="flex flex-row space-x-5 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-2" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" /></svg>
                <div className="">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default Notification;