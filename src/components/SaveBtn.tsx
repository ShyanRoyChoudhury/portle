import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { btnAtom } from '../../store/atom'


const SaveButton: React.FC = () => {
    
    
    const btnState = useRecoilValue(btnAtom)
    const setbtnState = useSetRecoilState(btnAtom)
    
    return(
        <div className="py-0.5 px-6 border-[0.5px] border-r-[3px] border-b-[1.5px] border-black font-semibold">
            <button onClick={()=> setbtnState(!btnState)}>Save</button>
        </div>
    )
}

export default SaveButton;