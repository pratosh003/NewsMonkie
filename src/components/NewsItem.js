import React from 'react'

const NewsItem = (props)=> {
    let { title, description, imageUrl, newsUrl, source, publishedAt } = props;
    return (
      <div>
        <div className="card bg-dark text-light card h-200"  >
          <span className="badge badge-warning" 
            style={{color: "orange", textAlign: "center", padding: "4px"}}> 
            {source?source:"Unknown"}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">at {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer"  className="btn btn-info btn-sm">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
