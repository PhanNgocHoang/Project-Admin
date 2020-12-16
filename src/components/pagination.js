import React from 'react';
import { useLocation, Link } from 'react-router-dom';


const Pagination = ({ pages }) => {

    const { pathname, search } = useLocation()
    const query = new URLSearchParams(search)

    const { totalPages, perPage, page, hasNext, hasPrev, prev, next } = pages
    const totalPage = Math.ceil(totalPages / perPage)

    // const [pageHtml, setpageHtml] = React.useState([])

    const formatUrl = (pages) => {
        query.set("page", pages)
        return `${pathname}?${query.toString()}`
    }

    //[1,2,3,...,7,8,9]

    function renderPageHtml(delta = 2) {
        const pagesHtml = []
        const left = page - delta;
        const right = page + delta;

        for (let i = 1; i <= totalPage; i++) {
            console.log("🚀 ~ file: pagination.js ~ line 28 ~ formatUrl ~ query", query.toString())
            if (i === 1 || i === page || i === totalPage || (i >= left && i <= right))
                pagesHtml.push(i)
        }
        return pagesHtml
    }


    return (
        <>
            <div id="pagination">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#">
                            Trang trước
              </a>
                    </li>
                    {
                        renderPageHtml().map((item, index) => {
                            return (
                                <li className={`page-item ${page === item && "active"}`} key={index}>
                                    <Link to={formatUrl(item)} className={`page-link`} href="#">
                                        {item}
                                    </Link>
                                </li>
                            )
                        })
                    }
                    <li className="page-item">
                        <a className="page-link" href="#">
                            Trang sau
              </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Pagination