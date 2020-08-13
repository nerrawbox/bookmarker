import React, { Component } from 'react'
import ModalForm from './ModalForm'
import axios from 'axios'
import ApiHelper from '../api/api_helper'

export default class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookmarks: [

            ],
            bookmark: null
        }
    }

    async componentDidMount() {
        await this.getBookmarks()
    }

    getBookmarks = async () => {
        await axios.get(ApiHelper.base_url + 'api/bookmark/')
            .then(response => {
                console.log('getBookmark status: ' + response.status)
                if (response.status >= 200 && response.status < 400) {
                    let json = response.data
                    if (json.length >= 0) {
                        console.log(json)
                        this.setState({
                            bookmarks: json,
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    parseUrl = (url) => {
        let r = new RegExp('^(?:[a-z]+:)?//', 'i')
        return r.test(url) ? url : `https://${url}`
    }

    initUpdate = (data) => {
        window.scrollTo(0, 0)
        this.setState({ bookmark: data })
    }

    initDelete = async (data) => {
        let url = `${ApiHelper.base_url}api/bookmark/${data.id}/`
        await axios.delete(url)
            .then(async response => {
                console.log('initDelete status: ' + response.status)
                if (response.status >= 200 && response.status < 400) {
                    this.getBookmarks()
                } else {

                }
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })
    }

    render() {
        return (
            <section className="container">
                <div className="py-5">
                    <div className="col my-5">
                        <div className="">
                            <div className="pb-3">
                                <div className="card card-body">
                                    <ModalForm
                                        getBookmarks={this.getBookmarks}
                                        updateData={this.state.bookmark}
                                    />
                                </div>
                                <br />
                                <h3>Bookmarks</h3>
                            </div>
                            <div className="card card-body">
                                <table className="table table-hover display" id="bookmarks">
                                    <thead>
                                        <tr>
                                            <th scope="col">Screenshot</th>
                                            <th scope="col">URL</th>
                                            <th scope="col">Tags</th>
                                            <th scope="col">Manage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.bookmarks.length > 0 ?
                                            this.state.bookmarks.map(bookmark => (
                                                <tr key={bookmark.id}>
                                                    <td>
                                                        <a href={bookmark.image} target="_blank" rel="noopener noreferrer" className="col-md-10">
                                                            <img src={bookmark.image} className="img-thumbnail" alt={bookmark.image} width="180" />
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <a className="font-weight-bold col-md-10 text-center m-auto" href={this.parseUrl(bookmark.url)} target="_blank" rel="noopener noreferrer">{bookmark.url}</a>
                                                    </td>
                                                    <td>
                                                        <div className="row d-flex">
                                                            {JSON.parse(bookmark.tags)?.map((tag, i) => (
                                                                <span className="badge badge-primary mr-1 mb-1" key={i}>{tag}</span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="row d-flex justify-content-center m-auto">
                                                            <button className="btn btn-primary btn-sm" onClick={() => this.initUpdate(bookmark)}><i className="fa fa-edit"></i> Edit</button>
                                                            <div className="mx-1"></div>
                                                            <button className="btn btn-danger btn-sm" onClick={() => this.initDelete(bookmark)}><i className="fa fa-trash"></i> Del</button>
                                                        </div>
                                                    </td>
                                                </tr>

                                            ))

                                            : null
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th scope="col">Screenshot</th>
                                            <th scope="col">URL</th>
                                            <th scope="col">Tags</th>
                                            <th scope="col">Manage</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </section >
        )
    }
}
