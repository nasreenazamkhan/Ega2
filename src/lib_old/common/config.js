import React, { Component } from "react";
export const Context = React.createContext({ name: "test" });
export class ConfigContext extends Component {
    constructor() {
        super();
        this.state = {
            name: "John",
            isLoggedIn: false,
            userInfo: {}
        };
    }
    logIn = (data) => {
        console.log(data)
        this.setState({
            isLoggedIn: true,
            userInfo: data
        });
    };
    logOut = () => {
        this.setState({
            isLoggedIn: false,
        })
    }
    delete = () => {
        this.setState({
            isLoggedIn: false,
            userInfo: {}
        })
    }
    changeName = () => {
        this.setState({
            name: "Rakesh"
        })
    }
    render() {
        const { isLoggedIn, userInfo, name } = this.state;
        return (
            <Context.Provider value={{ name, isLoggedIn, userInfo, changeName: this.changeName, logIn: this.logIn, logout: this.logOut, delete: this.delete }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}