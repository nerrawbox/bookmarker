import React, { Component } from 'react'
import Autocomplete from '@celebryts/react-autocomplete-tags'

export default class ModalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSubmit: false,
            url: '',
            tags: []
        }
    }


    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onAdd = (tag) => {
        this.setState({
            tags: [...this.state.tags, tag.value],
            isSubmit: false
        })
    }

    onDelete = (tag) => {
        var array = [...this.state.tags]
        var index = array.indexOf(tag.value)
        if (index !== -1) {
            array.splice(index, 1)
            this.setState({
                tags: array,
                isSubmit: false
            })
        }
    }

    formSubmit = async e => {
        e.preventDefault()
        //disable submit button here to prevent multiple submit
        //proceed to validation
        const { url, tags } = this.state
        if (url && url !== '') {
            const formData = { url, tags }
            console.log(formData)
        }
    }



    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Bookmark</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="inputAddress">URL</label>
                                    <input type="text" className="form-control" id="inputUrl" placeholder="URL"
                                        name="url"
                                        value={this.state.url}
                                        onChange={this.changeHandler} />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="inputAddress">Tags</label>
                                    <Autocomplete
                                        tags={this.state.tags}
                                        onAdd={this.onAdd}
                                        onDelete={this.onDelete}
                                    />

                                </div>

                            </div>
                            <div className="modal-footer form-group">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.formSubmit}>Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
