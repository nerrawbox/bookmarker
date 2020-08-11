import React, { Component } from 'react'

export default class ModalForm extends Component {
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
                        <div className="modal-body">


                            <form>

                                <div className="form-group">
                                    <label htmlFor="inputAddress">URL</label>
                                    <input type="text" className="form-control" id="imputUrl" placeholder="URL" />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="inputAddress">Tags</label>
                                    <input type="text" className="form-control" id="imputTags" name="tags" placeholder="Add Tags" />
                                </div>


                            </form>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
