import React,{useState} from 'react';
import {withRouter} from 'react-router';
// styles
import { Form  , Container , Button , Row} from 'react-bootstrap';

function FirstSection(props) {
   const [state, setstate] = useState({
        firstQuestion : '',
        secondQuestion : '',
        thirdQuestion : ''
   });

    const handleChange = props => event => {
        let value = event.target.value;

        if(props === 'firstQuestion'){
            handleRemoveRequired('firstQuestion');
            if(value === 'B2B'){
                // show second question 
                document.querySelector('#secondQuestion').classList.remove('d-none');
                // hide third question & clear it's value from state & & save values in state
                document.querySelector('#thirdQuestion').classList.add('d-none');
                setstate({...state , thirdQuestion : '' , [props] : value});
            }
            else if(value === 'B2C'){
                // show third question 
                document.querySelector('#thirdQuestion').classList.remove('d-none');
                // hide second question & clear it's value from state & & save values in state
                document.querySelector('#secondQuestion').classList.add('d-none');
                setstate({...state , secondQuestion : '' , [props] : value });
            }
            else{
                // show both questions & save values in state
                document.querySelector('#secondQuestion').classList.remove('d-none');
                document.querySelector('#thirdQuestion').classList.remove('d-none');
                setstate({...state , [props] : value});
            }
        }
        else if(props === 'secondQuestion'){
            handleRemoveRequired('secondQuestion');
            setstate({...state , [props] : value});
        }
        else if(props === 'thirdQuestion'){
            handleRemoveRequired('thirdQuestion');
            setstate({...state , [props] : value});
        }
    }
    const handleSubmit = () => {
       if(!state.firstQuestion){
            handleRequired('firstQuestion');
       }
       else if(state.firstQuestion && ( !state.secondQuestion || !state.thirdQuestion)){
           let value = state.firstQuestion;
            if(value === 'B2B' && !state.secondQuestion){
                handleRequired('secondQuestion');
            }
            else if(value === 'B2C' && !state.thirdQuestion){
                handleRequired('thirdQuestion');
            }
            else if(value === 'both'){
                if(!state.secondQuestion){
                    handleRequired('secondQuestion');
                }
                if(!state.thirdQuestion){
                    handleRequired('thirdQuestion');
                }
            }
            else{
                props.history.push({pathname : '/secondSection' , state : state})
            }
       }
       else{
         props.history.push({pathname : '/secondSection' , state : state})
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
                <div key='first-question'  id='firstQuestion' className="mb-3 border rounded p-3">
                    <p>- Is your business model B2C or B2B or both? <span className="text-danger">*</span></p>
                    {['B2C','B2B','both'].map(value=>(
                        <Form.Check 
                                required
                                type='radio'
                                name="firstQuestion"
                                id={`firstQuestion${value}`}
                                value={value}
                                label={value}
                                inline
                                onChange={handleChange('firstQuestion')}
                            />
                    ))}
                </div>
                <div key='second-question' id='secondQuestion' className="mb-3 border rounded p-3 d-none">
                    <p>-  Do you target all age brackets? <span className="text-danger">*</span></p>
                    {['yes','no'].map(value=>(
                        <Form.Check 
                                type='radio'
                                name="secondQuestion"
                                id={`secondQuestion${value}`}
                                value={value}
                                label={value}
                                inline
                                onChange={handleChange('secondQuestion')}
                            />
                    ))}
                </div>
                <div key='third-question'  id='thirdQuestion' className="mb-3 border rounded p-3 d-none">
                    <p>-  Do you target all industries?<span className="text-danger">*</span> </p>
                    {['yes','no'].map(value=>(
                        <Form.Check 
                                type='radio'
                                name="thirdQuestion"
                                id={`thirdQuestion${value}`}
                                value={value}
                                label={value}
                                inline
                                onChange={handleChange('thirdQuestion')}
                            />
                    ))}
                </div>
                <div className="w-100 text-center">
                    <Button 
                        variant="light"
                        className="pe-4 ps-4"
                        onClick={handleSubmit}>
                        Next
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default withRouter(FirstSection);
