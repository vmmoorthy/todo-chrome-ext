import { createContext, useEffect, useState } from "react";
import { getAll } from "storage_engine";
import { DB } from "../App";

export const priorityContext = createContext(null)

const PriorityContext = ({ children }) => {

    const priorityList = useState([]);
    useEffect(() => {
        if (DB.db)
            (async () => priorityList[1](await getAll(DB.db, "priority")))()
        // eslint-disable-next-line
    }, [DB.db]);

    return (
        <priorityContext.Provider value={priorityList}>
            {children}
        </priorityContext.Provider>
    );
}

export default PriorityContext;