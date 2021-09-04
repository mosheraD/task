import React,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
// styles
import { Form  , Container , Button } from 'react-bootstrap';

function SecondSection(props) {
   const [state, setState] = useState();
   const [err, setErr] = useState();

   useEffect(()=>{
    //save 'section one' qustions in local storage & state
    if(props.location?.state){
        localStorage.setItem('sec1',props.location.state);
         setState({...state ,...props.location.state})
    }else{
        let sec1 =  localStorage.getItem('sec1');
        setState({...state ,...sec1})
    }
   },[]);
    const handleChange = props => event => {
        let value = event.target.value;

        if(props === 'fourthQuestion'){
            handleRemoveRequired('fourthQuestion');
            if(value === 'yes'){
                //answer box available
                document.querySelector('#fifthQuestion input').disabled = false;
                setState({...state , [props] : value});
            }
            else{
                //answer box not available & clear the data & remove error
                document.querySelector('#fifthQuestion input').disabled = true;
                setState({...state , fifthQuestion : '' , [props] : value});
                handleRemoveRequired('fifthQuestion');
                setErr('');
            }
        }
        else{
            handleRemoveRequired('fifthQuestion');
            setErr('');
            setState({...state , [props] : value});
            let regEx = /^[0-9]*[1-9][0-9]*$/;
            if(!regEx.test(value)){
                setErr('This field acceptes only positive numbers.');
            }
        }
    }
    const handleSubmit = () =>{
        if(!state.fourthQuestion){
            handleRequired('fourthQuestion');
        }else if(state.fourthQuestion === 'yes' && !state.fifthQuestion){
            handleRequired('fifthQuestion');
        }else if(state.fourthQuestion === 'yes' && err){
            handleRequired('fifthQuestion');
        }else{
            props.history.push({pathname : '/review' , state : state})
        }
    }
    const handleRequired = (selector) => {
        document.querySelector(`#${selector}`).classList.add('border-danger');
    }
    const handleRemoveRequired = (selector) => {
        document.querySelector(`#${selector}`).classList.remove('border-danger');
    }
    return (
        <Container className="mt-3">
            <Form className="">
                <div key='fourth-question' id='fourthQuestion' className="mb-3 border rounded p-3">
                    <p>- Did you have an investment?</p>
                    {['yes','no'].map(value=>(
                        <Form.Check 
                                type='radio'
                                name="fourthQuestion"
                                id={`fourthQuestion${value}`}
                                value={value}
                                label={value}
                                inline
                                onChange={handleChange('fourthQuestion')}
                            />
                    ))}
                </div>
                <div key='fifth-question' id='fifthQuestion' className="mb-3 border rounded p-3">
                    <p>- how much was the investment?</p>
                    <Form.Control 
                        type="number"
                        value={state?.fifthQuestion}
                        onChange={handleChange('fifthQuestion')}
                        />
                    <small className="text-danger">{err && err}</small>
                </div>
                <div className="w-100 text-center">
                    <Button 
                        varient="light"
                        className="pe-4 ps-4"
                        onClick={handleSubmit}>
                        Next
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default withRouter(SecondSection);
