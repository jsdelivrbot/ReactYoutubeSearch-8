import _ from 'lodash';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import YouTubeSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyAQOVoZi7D0Qjp2PlkBFWyEFn9W0yA2B1A';


//Create a new component. This component should produce
//some html
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos:[],
      selectedVideo:null
    };
    this.videoSearch('dota2');

  }

  videoSearch(term){
    YouTubeSearch({key:API_KEY, term:term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo : videos[0]
      });
      console.log(videos);
    });
  }
  render(){
    const videoSearch = _.debounce(term => {this.videoSearch(term)}, 300);
    return (
      <div>
        <SearchBar onSearchChange = {videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}
//Take this component's generated HTML and put it
//on the page(in the DOM)

ReactDOM.render(<App/>, document.querySelector('.container'));
