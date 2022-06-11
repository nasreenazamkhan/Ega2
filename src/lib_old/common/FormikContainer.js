import React from 'react'
import { Formik } from 'formik';

function FormikContainer(props) {
    return (
        <Formik initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={props.onSubmit}>
            {
                formik => {
                    // fmk = formik;
                    return (
                        <>
                            {props.children}
                        </>
                    )
                }
            }
        </Formik>
    )
}

export default FormikContainer
