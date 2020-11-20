import React from 'react';

export const FormBooksComponent = () => {
    return (
        <div className="content">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <strong>Create Book</strong>
                            </div>
                            <div className="card-body card-block">
                                <form action="#" method="post" encType="multipart/form-data" className="form-horizontal">
                                    <div className="row form-group">
                                        <div className="col col-md-3"><label htmlFor="book-name-input" className=" form-control-label">Book Name</label></div>
                                        <div className="col-12 col-md-9"><input type="text" id="book-name" name="book-name" placeholder="Enter book name" className="form-control" /></div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col col-md-3"><label htmlFor="type-book-input" className=" form-control-label">Book Type</label></div>
                                        <div className="col-12 col-md-9"><input type="text" id="type-book-input" name="type-book" placeholder="Enter book type" className="form-control" /></div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col col-md-3"><label htmlFor="publisher-input" className=" form-control-label">Publisher</label></div>
                                        <div className="col-12 col-md-9"><input type="text" id="publisher-input" name="publisher-name" placeholder="Enter Publisher" className="form-control"/></div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col col-md-3"><label htmlFor="price-input" className=" form-control-label">Price</label></div>
                                        <div className="col-12 col-md-9"><input type="number" id="price-input" name="price-input" placeholder="Enter book price" className="form-control" /></div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col col-md-3"><label htmlFor="description-input" className=" form-control-label">Description</label></div>
                                        <div className="col-12 col-md-9"><textarea name="description-input" id="description-input" rows={9} placeholder="Content..." className="form-control" defaultValue={""} /></div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col col-md-3"><label htmlFor="book-file-input" className=" form-control-label">Book File</label></div>
                                        <div className="col-12 col-md-9"><input type="file" id="book-file-input" name="book-file-input" className="form-control-file" /></div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col col-md-3"><label htmlFor="book-images-multiple-input" className=" form-control-label">Book Images</label></div>
                                        <div className="col-12 col-md-9"><input type="file" id="book-images-multiple-input" name="book-images-input" multiple className="form-control-file" /></div>
                                    </div>
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