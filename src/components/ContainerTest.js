import React from 'react';
import Container from './Container';


const ContainerDetails = [
    {
        containerNo: 'C001'
    },
    {
        containerNo: 'C002'
    },
    {
        containerNo:'C003'
    }


];


const ContainerTest = () => {

    return (
        <div className="col-md">
            {ContainerDetails.map(container => (
                <Container containerNo={container.containerNo} key={container.containerNo}></Container>

            ))}
        </div>

    )

}

export default ContainerTest;