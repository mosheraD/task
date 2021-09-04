import React,{useState , useEffect} from 'react';
import {withRouter} from 'react-router';
// styles
import { Form  , Container , Button , Row} from 'react-bootstrap';

function Review(props) {
    let questions = props.location?.state;
    const [isLoading , setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify(questions),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(response => {
                response.json();
                setIsLoading(false);
                alert('Your answers are submitted successfully');
                props.history.push('/');
            })
            .then(json => {
                console.log(json);
            })
            .catch(err=>console.log(err));
    }
    if(questions){
        return (
            <Container className="mt-3">
                <Form className="">
                    <div key='first-question' className="mb-2 border rounded p-2">
                        <p className="mb-1">- Is your business model B2C or B2B or both? </p>
                        <p className="mb-1">{questions.firstQuestion}</p>
                    </div>
                    {questions.secondQuestion && 
                    <div key='second-question' className="mb-2 border rounded p-2">
                        <p className="mb-1">- Do you target all age brackets? </p>
                        <p className="mb-1">{ questions.secondQuestion}</p>
                    </div>
                    }
                    {questions.thirdQuestion && 
                    <div key='third-question' className="mb-2 border rounded p-2">
                        <p className="mb-1">- Do you target all industries? </p>
                        <p className="mb-1">{questions.thirdQuestion}</p>
                    </div>
                    }
                    <div key='forth-question' className="mb-2 border rounded p-2">
                        <p className="mb-1">- Did you have an investment?</p>
                        <p className="mb-1">{questions.fourthQuestion}</p>
                    </div>
                    {questions.fifthQuestion && 
                    <div key='fifth-question' className="mb-2 border rounded p-2">
                        <p className="mb-1">- how much was the investment?</p>
                        <p className="mb-1">{questions.fifthQuestion && questions.fifthQuestion}</p>
                    </div>
                    }
                    <div className="w-100 text-center">
                    {isLoading ? 'Loading...' :
                        <Button 
                            variant="light"
                            className="pe-4 ps-4"
                            onClick={handleSubmit}>
                            Submit
                        </Button>
                    }
                    </div>
                </Form>
            </Container>
        )
    }
    else{
        return(<div>there is something wrong!</div>)
    }
   
}

export default withRouter(Review);
