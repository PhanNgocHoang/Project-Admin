import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const TypeBookComponent = () => {
    const [typeBook, setTypeBook] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/typebook').then((response) => {
            if (response.status === 200) {
                setTypeBook(response.data.data.data)
            }
        })
    }, [])
    return (
        <div className="content">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <strong className="card-title">Type Book</strong>
                                <button className="btn btn-success" style={{ float: 'right' }}><i className="fa fa-plus-circle" aria-hidden="true"></i>Create</button>
                            </div>
                            <div className="card-body">
                                <table id="bootstrap-data-table" className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Type Name</th>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {typeBook.map(type => (
                                            <tr key={type._id}>
                                                <td style={{ width: '70%' }}>{type.type_name}</td>
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
