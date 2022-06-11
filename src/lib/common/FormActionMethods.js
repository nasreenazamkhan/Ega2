import React, { Component } from 'react'

const FormActionMethods = (OriginalComponent) => {

    class NewComponent extends Component {
        render() {
            return <OriginalComponent />
        }
    }

    return NewComponent;

}

export default FormActionMethods;
