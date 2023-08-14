import React from 'react';

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div>
            <div className="card" >
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: 0
                }
                }>
                    <span className=" badge rounded-pill bg-danger" style={{ left: '90%', zidex: '1' }}>
                        {source}
                    </span>
                </div>

                <img src={!imageUrl ? "https://i.ytimg.com/vi/aV5jO6dp4aI/maxresdefault.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} On {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target='blank' className="btn bt-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    );

}

export default NewsItem;
