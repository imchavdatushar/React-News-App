import React, {useEffect,useState} from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';



const News=(props)=> {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
   const capitalizedFunction = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
   
        
    
    const UpdateNews =async()=> {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=87089eb1416f401187a80d384c2ec310&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json()
        props.setProgress(70);
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalizedFunction(props.category)}-NewsMonkey`;
        UpdateNews()
    }, []);

    const handlePrevClick = async () => {
        setPage(page-1);
        UpdateNews()
    }
    const handleNextClick = async () => {
        setPage(page+1);
        UpdateNews()
    }
    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=87089eb1416f401187a80d384c2ec310&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        setLoading(true);
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        setArticles(articles.concat(parseData.articles))
        setTotalResults(parseData.totalResults)
        setLoading(false)
       
    }


        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px',marginTop:'90px' }}>MonkeyNews-Top Headlines from {capitalizedFunction(props.category)} News</h1>
                {/* {loading && <spinner />} */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles !== totalResults}
                    loader={<Spinner />}
                ><div className="container">
                        <div className="row my-3">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage}
                                        newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            }
                            )
                            }
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )

}
News.defaultProps = {
    country: 'in',
    pageSize: '6',
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;
