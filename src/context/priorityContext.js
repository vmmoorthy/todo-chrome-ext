import { createContext, useState } from "react";

export const priorityContext = createContext(null)

const PriorityContext = ({children}) => {

    const priorityList = useState([]);

    return (
        <priorityContext.Provider value={priorityList}>
            {children}
        </priorityContext.Provider>
    );
}

export default PriorityContext;