import React, { Component, Fragment } from 'react'
import Autocomplete from '@celebryts/react-autocomplete-tags'
import axios from 'axios'
import ApiHelper from '../api/api_helper'

export default class ModalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSubmit: false,
            isUpdate: false,
            url: '',
            tags: [],
            image: '-'
        }
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate Form')
        if (prevProps.updateData?.id !== this.props.updateData?.id) {
            console.log(this.props.updateData)
            this.setState({
                isUpdate: true,
                url: this.props.updateData.url,
                tags: JSON.parse(this.props.updateData.tags),
                image: this.props.updateData.image
            })
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
        const { url, image } = this.state
        if (url && url !== '' && this.state.tags.length > 0) {
            let tags = JSON.stringify(this.state.tags)
            const formData = { url, tags, image }
            console.log(formData)
            if (!this.state.isUpdate)
                this.initPostRequest(formData)
            else
                this.initPatchRequest(formData)
        }
    }

    initPatchRequest = async (formData) => {
        let url = `${ApiHelper.base_url}api/bookmark/${this.props.updateData.id}/`
        await axios.put(url, formData)
            .then(async response => {
                console.log('initPostRequest status: ' + response.status)
                if (response.status >= 200 && response.status < 400) {
                    console.log('bookmark sent')
                    this.clearForm()
                    this.props.getBookmarks()
                } else {

                }
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })
    }

    initPostRequest = async (formData) => {
        await axios.post(ApiHelper.base_url + 'api/bookmark/', formData)
            .then(async response => {
                console.log('initPostRequest status: ' + response.status)
                if (response.status >= 200 && response.status < 400) {
                    console.log('bookmark sent')
                    this.clearForm()
                    this.props.getBookmarks()
                } else {

                }
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })
    }

    clearForm = () => {
        this.setState({
            isSubmit: false,
            isUpdate: false,
            url: '',
            tags: [],
            image: '-'
        })
    }

    renderCreateForm = () => {
        return (
            <form>
                <div className="row">
                    <div className="form-group col-md-4">
                        <small className="text-primary">Url</small>
                        <input type="text" className="form-control" id="inputUrl" placeholder="URL"
                            name="url"
                            value={this.state.url}
                            onChange={this.changeHandler} />
                    </div>

                    <div className="form-group col-md-5">
                        <small className="text-primary">Tags</small>
                        <Autocomplete
                            tags={this.state.tags}
                            onAdd={this.onAdd}
                            onDelete={this.onDelete}
                        />
                    </div>

                    <div className="col form-group col-md-3">
                        {!this.state.isUpdate ?
                            <Fragment>
                                <label htmlFor="inputAddress">&nbsp;</label>
                                <button className="btn btn-sm btn-primary form-control" type="button" onClick={this.formSubmit}>
                                    <i className="fa fa-bookmark"></i>&nbsp;Add Bookmark</button>
                            </Fragment> :
                            <Fragment>
                                <button className="btn btn-sm" type="button" onClick={this.clearForm}>Clear</button>
                                <button className="btn btn-sm btn-warning form-control" type="button" onClick={this.formSubmit}>
                                    <i className="fa fa-bookmark"></i>&nbsp;Update Bookmark</button>

                            </Fragment>
                        }
                    </div>
                </div>
            </form>

        )
    }

    render() {
        return (
            this.renderCreateForm()
        )
    }
}
