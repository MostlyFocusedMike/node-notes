import React from 'react';
import YouTube from 'react-youtube';
import AppContext from '../../context';


class VideoExtension extends React.Component {
    constructor() {
        super();
        this.state = {
            video: {},
            title: '',
            newUrl: '',
            currentUrl: 'gpmerrSpbHg',
        };
    }

    setId = () => {
        return 'gpmerrSpbHg';
    }

    handleChange = (e) => {
        console.log('e.target.value: ', e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            currentUrl: this.youtubeParser(this.state.newUrl),
            newUrl: '',
        });
    }

    youtubeParser = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }

    setVideo = (e) => {
        this.setState({
            video: e.target,
            title: e.target.getVideoData().title,
        }, () => {
            console.log('this.state.video: ', this.state.video.getVideoData().title);
        });
    }

    render() {
        const opts = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0,
            },
        };
        return (
            <div>
                <YouTube
                    videoId={this.state.currentUrl}
                    opts={opts}
                    onReady={this.setVideo}
                />
                <p>Currently playing: {this.state.title}</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='new-url'>Youtube Link</label>
                    <input
                        type="text"
                        name='newUrl'
                        id='new-url'
                        value={this.state.newUrl}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="submit" />
                </form>
            </div>

        );
    }
}

VideoExtension.contextType = AppContext;

export default VideoExtension;
