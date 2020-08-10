import React, { Component, Fragment } from 'react'
import NavBar from '../components/NavBar'
import Table from '../components/Table'

export default class Dashboard extends Component {
    render() {
        return (
            <Fragment>
                <NavBar />
                <Table />
            </Fragment>
        )
    }
}
