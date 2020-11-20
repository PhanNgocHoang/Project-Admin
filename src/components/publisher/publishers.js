import React from 'react';


export const PublisherComponent = () => {
    const ArrayBook = [
        {id:1, publisher_name: 'Publisher 1', address: "Ha Noi"},
        {id:2, publisher_name: 'Publisher 2', address: "Ho Chi Minh"},
        {id:3, publisher_name: 'Publisher 3', address: "Da Nang"},
        {id:4, publisher_name: 'Publisher 4', address: "Hue"},
        {id:5, publisher_name: 'Publisher 5', address: "Nghe An"},
        {id:6, publisher_name: 'Publisher 6', address: "Ha Tinh"},
        {id:7, publisher_name: 'Publisher 7', address: "Thanh Hoa"},
        {id:8, publisher_name: 'Publisher 8', address: "Hai Phong"},
        {id:9, publisher_name: 'Publisher 9', address: "Quang Ninh"},
        {id:10,publisher_name: 'Publisher 10', address: "Ho Chi Minh"},
        {id:11, publisher_name: 'Publisher 11', address: "Vung Tau"},
        {id:12, publisher_name: 'Publisher 12', address: "Da Nang"},
        {id:13, publisher_name: 'Publisher 13', address: "Ha Noi"},
    ]
    return (
        <div className="content">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <strong className="card-title">Publisher</strong>
                                <button className="btn btn-success" style={{float: 'right'}}><i className="fa fa-plus-circle" aria-hidden="true"></i>Create</button>
                            </div>
                            <div className="card-body">
                                <table id="bootstrap-data-table" className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Publisher Name</th>
                                            <th>Publisher Address</th>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {ArrayBook.map(publisher => (
                                         <tr key={publisher.id}>
                                            <td style={{width:'35%'}}>{publisher.publisher_name}</td>
                                            <td style={{width:'35%'}}>{publisher.address}</td>
                                            <td>
                                                <button className="btn btn-info m-1"><i className="fa fa-info" aria-hidden="true"></i> Detail</button>
                                                <button className="btn btn-primary m-1"><i className="fa fa-pencil-square" aria-hidden="true"></i> Edit</button>
                                                <button className="btn btn-danger m-1"><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}