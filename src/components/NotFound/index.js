import './index.css'

const NotFound = () => (
  <div className="notfound-con">
    <img
      src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
      alt="not found"
      className="notfound-img"
    />
    <h1 className="notfound-head">Page Not Found</h1>
    <p className="notfound-desc">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
