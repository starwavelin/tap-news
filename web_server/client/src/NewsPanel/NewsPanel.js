import './NewsPanel.css';
import NewsCard from '../NewsCard/NewsCard';
import _ from 'lodash';

import React from 'react';

class NewsPanel extends React.Component {
  constructor() {
    super();
    this.state = { news: null };
  }

  componentDidMount() {
    this.loadMoreNews();
    this.loadMoreNews = _.debounce(this.loadMoreNews, 1000); //debounce wraps a function
    window.addEventListener('scroll', () => this.handleScroll());
  }

  /** 
   * invoke loadMoreNews when user scrolls to the end
  */
  handleScroll() {
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
      console.log('handleScroll');
      this.loadMoreNews();
    }
  }

  /** 
   * loadMoreNews() is called when user scroll down the screen and reaches
   * a point when no more news available on the screen
   */
  loadMoreNews() {
    console.log('Load More News');

    /* the news_url is similar to the restful API URL */
    const news_url = 'http://' + window.location.hostname + ':3000' + '/news';
    const request = new Request(news_url, { method: 'GET' });

    fetch(request)
      .then(res => res.json())
      .then(fetched_news_list => {
        this.setState({ news: this.state.news 
          ? this.state.news.concat(fetched_news_list) : fetched_news_list });
      }, err => {
        console.log(`couldn\'t fetch the news list, error message:${err}`);
      });
  }

  /**
   * Render the current few news existing in the news panel
   */
  renderNews() {
    const news_card_list = this.state.news.map(one_news => {
      return (
        <a className='list-group-item' key = {one_news.digest} href='#'>
          <NewsCard news = {one_news} />
        </a>
      );
    });

    return (
      <div className='container-fluid'>
        <div className='list-group'>
          {news_card_list}
        </div>
      </div>
    );
  }


  render() {
    if (this.state.news) {
      return (
        <div>
          {this.renderNews()}
        </div>
      );
    } else {
      return (
        <div id='msg-app-loading'>
          Loading...
        </div>
      );
    }
  }
}

export default NewsPanel;
