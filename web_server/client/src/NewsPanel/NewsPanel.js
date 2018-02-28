import './NewsPanel.css';
import NewsCard from '../NewsCard/NewsCard';

import React from 'react';

class NewsPanel extends React.Component {
  constructor() {
    super();
    this.state = { news: null };
  }

  componentDidMount() {
    this.loadMoreNews();
  }

  /** 
   * loadMoreNews() is called when user scroll down the screen and reaches
   * a point when no more news available on the screen
   */
  loadMoreNews() {
    const mock_news = [{
			'source':'The Wall Street Journal',
			'title': 'Berkshire Hathaway Benefits From U.S. Tax Plan',
			'description':'Warren Buffett has one man to thank for Berkshire Hathaway Inc.’s $29 billion windfall in 2017: President Donald Trump.',
			'url':'https://www.wsj.com/articles/berkshire-hathaway-posted-29-billion-gain-in-2017-from-u-s-tax-plan-1519480047',
			'urlToImage':'http://www.thecommonsenseshow.com/siteupload/2016/10/wsj.png',
			'publishedAt':'2018-02-24T18:42:00Z',
			'digest':'3RjuEom==\n',
			'reason':'Recommend'
		}, {
			'source':'Fortune',
			'title': 'Here is how much Bitcoin Elon Musk Owns',
			'description':'Tesla CEO Elon Musk isn’t exactly active in cryptocurrency. Musk revealed this week on Twitter how much Bitcoin he owns—and it’s not much.',
			'url':'http://fortune.com/2018/02/23/bitcoin-elon-musk-value/',
			'urlToImage':'https://www.fortune.magazine.co.uk/files/7213/7882/9592/Fortune-magazine-cover6.jpg',
			'publishedAt':'2018-02-23T18:42:00Z',
			'digest':'3RjuEomTtul==\n',
			'reason':'Recommend'
		}];

    this.setState({ news: mock_news });
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
