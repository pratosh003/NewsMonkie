import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {
  const [articles, setArticles] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  //document.title = `"NewsMonkey - ${props.category}"`;

  const updateNews = async () => {
    setLoading(true)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6a35325fdbb84d7bbeceae77d5ed430c&page=${page}&pageSize=${props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  }

  useEffect(() => {
    updateNews();
  }, [])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6a35325fdbb84d7bbeceae77d5ed430c&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };


  return (
    <>
      <h2 className="text-center text-light " style={{ margin: '35px 0px', marginTop: '90px' }}>Top Headlines - {capitalizeFirstLetter(props.category)}</h2>     
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-2" >
            {articles.map((element) => {
              return <div className="col-md-4 my-3" key={element.url}>
                <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "}
                  imageUrl={element.urlToImage ? element.urlToImage : "https://www.volkswagenag.com/presence/news/standard-teaser-bilder/Website_Canvas_blau_1163.jpg"}
                  newsUrl={element.url} source={element.source.name} publishedAt={element.publishedAt} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
