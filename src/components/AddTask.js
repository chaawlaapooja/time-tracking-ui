import React,{useState} from 'react';
import CustomModal from './Modal';

const AddTask = () => {
    const [isOpen, setIsOpen] = useState(false)
    const close_modal = () => {
        setIsOpen(false)
    }
    return(
        <div>
            <button className="button" onClick={()=>setIsOpen(true)}>+ Add Task</button>
            {isOpen?<CustomModal close_modal={close_modal} purpose='add' name='' tags={[]} />:undefined}
        </div>
    )
}

export default AddTask