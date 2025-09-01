import React from 'react'
import { Link } from 'react-router-dom'
const BreadCrumb = (props) => {
    const {title} = props;
  return (
    <div className="breadcrumb py-1">
        <div className="container-xl">
            <div className="col-12">
                <p className="text-center">
                    <Link to="/" className="text-dark">
                    Home &nbsp;
                    </Link>
                    /{title}
                </p>
            </div>
        </div>
    </div>
  )
}

export default BreadCrumb