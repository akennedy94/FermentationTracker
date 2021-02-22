const FormInput = (props) => {

    return (
        <div>
            <input 
                className={`form-control ${props.errorPresent ? "form-error" : ""}`}
                type={props.type} 
                id={props.for}
                name={props.title}
                onChange={(event) => {
                    if(parseInt(event.target.value) && parseInt(event.target.value) < 0) {
                        return
                    } else {
                        props.onChange(event.target.value);
                    }
                }}
                value={`${props.value === null ? "" : props.value}`}
                placeholder={props.title}
                required
                readOnly={props.readOnly ? props.readOnly : false}
            /><br/>
        </div>
    )
}

export default FormInput;