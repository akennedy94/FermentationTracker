const NotesInput = (props) => {
    return (
        <div>
            <textarea 
            class="form-control" 
            id={props.for} 
            rows="3" 
            onChange={(event) => props.onChange(event.target.value)}
            placeholder={props.title}
            value={props.value ? props.value : null}
            /><br/>
        </div>
    )
}

export default NotesInput;