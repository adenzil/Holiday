import { Fragment } from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {

  return (
    <Fragment>
      <div className="jumbotron vh-100">
        <div className="d-flex justify-content-center">
          <Spinner animation="border"/>
        </div>
      </div>
    </Fragment>
  )

}

export default Loader