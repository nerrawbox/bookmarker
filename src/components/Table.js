import React, { Component } from 'react'
import ModalForm from './ModalForm'
import axios from 'axios'
import ApiHelper from '../api/api_helper'

export default class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookmarks: []
        }
    }

    async componentDidMount() {
        await axios.get(ApiHelper.base_url + 'api/bookmark/')
            .then(response => {
                console.log('getBookmark status: ' + response.status)
                if (response.status >= 200 && response.status < 400) {
                    let json = response.data
                    if (json.length > 0) {
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

    render() {
        return (
            <section className="container">
                <div className="py-5">
                    <div className="col my-5">
                        <div className="">
                            <div className="pb-3">
                                <button className="btn btn-outline-primary my-2 my-sm-0" type="button"
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
                                        {this.state.bookmarks.length > 0 ?
                                            this.state.bookmarks.map(bookmark => (
                                                <tr key={bookmark.id}>
                                                    <th>
                                                        <a href={this.parseUrl(bookmark.url)} target="_blank" rel="noopener noreferrer">{bookmark.url}</a>
                                                    </th>
                                                    <td>
                                                        <div className="row">
                                                            {bookmark.tags.split(',').map((tag, i) => (
                                                                <span className="badge badge-primary mr-1" key={i}>{tag}</span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>{bookmark.image}</p>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-primary btn-sm"><i className="fa fa-edit"></i> Edit</button>
                                                    </td>
                                                </tr>

                                            ))

                                            : null
                                        }
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
