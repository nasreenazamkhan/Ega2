import React, { Component } from 'react'
import AppSkeleton from '../components/spinner/AppSkeleton';
import { Fade } from '@material-ui/core';

const lazyComponentLoad = (mycomponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            mycomponent()
                .then(cmp => {
                    this.setState({ component: cmp.default });
                });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : <><AppSkeleton /></>;

        }

    }
}

export default lazyComponentLoad;
