import React, { Component } from 'react'
import ModalForm from './ModalForm'

export default class Table extends Component {
    render() {
        return (
            <section className="container">
                <div className="py-5">
                    <div className="col my-5">
                        <div className="">
                            <div className="pb-3">
                                <button className="btn btn-outline-primary my-2 my-sm-0" type="button" className="btn btn-primary"
                                    data-toggle="modal" data-target="#exampleModal">
                                    <i className="fa fa-bookmark"></i>&nbsp;New Bookmark</button>
                            </div>
                            <div className="card card-body">
                                <table className="table table-hover display" id="bookmarks">
                                    <thead>
                                        <tr>
                                            <th scope="col">URL</th>
                                            <th scope="col">Tags</th>
                                            <th scope="col">Screenshot</th>
                                            <th scope="col">Manage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <a href="https://www.google.com" target="_blank">www.google.com</a>
                                            </th>
                                            <td>
                                                <span className="badge badge-primary">Search</span>
                                                <span className="badge badge-primary">Google</span>
                                                <span className="badge badge-primary">Website</span>
                                            </td>
                                            <td>

                                            </td>
                                            <td>
                                                <button className="btn btn-primary btn-sm"><i className="fa fa-edit"></i> Edit</button>
                                            </td>

                                        </tr>
                                        <tr>
                                            <th><a href="https://www.stackoverflow.com" target="_blank">www.stackoverflow.com</a>
                                            </th>
                                            <td>
                                                <span className="badge badge-primary">Programming</span>
                                                <span className="badge badge-primary">Stackoverflow</span>
                                                <span className="badge badge-primary">Website</span>
                                            </td>
                                            <td></td>
                                            <td>
                                                <button className="btn btn-primary btn-sm"><i className="fa fa-edit"></i> Edit</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <ModalForm />
            </section>
        )
    }
}
