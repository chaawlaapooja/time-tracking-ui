import React,{useState} from 'react';
import Modal from 'react-awesome-modal';
import data from '../store/dummydata/tags';
import { useDispatch } from 'react-redux';
import * as tasksActions from '../store/actions/tasks';

const CustomModal = (props) => {
    const [name, setName] = useState(props.name)
    const [selectedTags, setSelectedTags]= useState(props.tags)
    const [tags, setTags] = useState(data.filter(tag => !selectedTags.includes(tag)))
    const [error, setError] = useState('')

    const dispatch = useDispatch();

    const handleNameChange = e => {
        e.preventDefault()
        setName(e.target.value)
    }
    const callback = (response) => {
        if(response==='error'){
           alert('Some error occured')
           props.close_modal()
       }
       else{
           props.close_modal()
           alert(`Task ${props.purpose==='add'?'added':'updated'} successfully`)
       }
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(name==='' || selectedTags.length===0)
            setError('Please give your task some name and add a tag to it')
        else{
            setError('')
            if(props.purpose==='add'){
                dispatch(tasksActions.addTask(name, selectedTags)).then(callback)
            }
            else
                dispatch(tasksActions.updateTask(name, selectedTags, props._id)).then(callback)
        }
        
    }
    const handleTagClick = (tag,tagType) => {
        if(tagType==='selected'){
            setTags([...tags, tag])
            setSelectedTags(selectedTags.filter(t=>t!==tag))
        }
        else{
            setSelectedTags([...selectedTags, tag])
            setTags(tags.filter(t=>t!==tag))
        }
    }
    return(
        <div>
            <Modal visible={true} width="500" effect="fadeInUp" onClickAway={props.close_modal} >
                <div className="modal-content">
                    <div className="modal-header" style={{color: "white"}}>
                        <button type="button" className="close" onClick={props.close_modal}>&times;</button>
                    </div>
                    <div className="modal-body">
                      <h2>{props.purpose.toUpperCase()} TASK</h2>
                        {error ? <p style={{color:"red"}}>{error}</p> : undefined}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Name"
                                onChange={handleNameChange}
                                value={name} style={{width:95+"%"}}
                                name="name"
                            />
                            <br/>
                            {selectedTags.map(tag=><button className="button button--pill" key={tag} style={{backgroundColor:'#D8BFD8'}} onClick={()=>handleTagClick(tag, 'selected')}>{tag}</button>)}
                            <br/>
                            <label>Select relevant tags :</label>
                            <br/>
                            {tags.map(tag=><button className="button button--pill" key={tag} onClick={()=>handleTagClick(tag, 'unselected')}>{tag}</button>)}
                            <br/><br/>
                            <button className="button">{props.purpose} Task</button>
                        </form>
                    </div>
                    <div className="modal-footer" >
                      <button type="button" className="btn btn-default" style={{padding:5+"px"}} onClick={props.close_modal}>CLOSE</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CustomModal