import React from 'react';
import {InputAuthor} from './input.author'

export const FormAuthorComponent = () => {
    return (
        <div className="content">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Create Author</strong>
                            </div>
                            <div className="card-body card-block">
                                <form className="form-horizontal">
                                    <InputAuthor />
                                    <div className="row form-group d-flex justify-content-center">
                                            <button type="submit" className="btn btn-success">
                                            <i className="fa fa-plus-square"/>Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}