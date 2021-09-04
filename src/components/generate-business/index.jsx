import React from 'react';
import {withRouter} from 'react-router';
// styles
import { Container, Row, Col ,Button } from 'react-bootstrap';

function Index(props) {
    return (
        <Container className="">
            <Row  style={{height : '100vh'}} className="text-center  align-items-center">
                <Col>
                    <Button 
                        variant="light" 
                        className="pe-4 ps-4"
                        onClick={() => props.history.push('/firstSection')}>
                        generate business plan
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(Index);
