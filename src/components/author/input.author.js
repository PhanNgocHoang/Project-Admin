import React from 'react';

export const InputAuthor = props => {
    return (
        <div className="row form-group">
            <div className="col col-md-3"><label htmlFor="author-name-input" className=" form-control-label">Author name</label></div>
            <div className="col-12 col-md-9"><input type="text" id="author-name" name="author-name" value={props.authorName} placeholder="Enter author name" className="form-control" /></div>
        </div>
    )
}