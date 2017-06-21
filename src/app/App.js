import React from 'react'
import { Provider } from 'react-redux'
import getStore from '../store/createStore'
import Nav from '../navigation/AppNavigator'

const store = getStore

export default function App(props){
    return (
        <Provider store = {store} >
            <Nav/>
        </Provider>
    )
}

