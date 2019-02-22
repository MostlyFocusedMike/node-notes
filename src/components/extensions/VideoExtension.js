import React from 'react';
import AppContext from '../../context';


class VideoExtension extends React.Component {
    render() {
        return (
            <div>
                I AM THE VIDEO EXTENSION PLACEHOLDER
            </div>
        );
    }
}

VideoExtension.contextType = AppContext;

export default VideoExtension;
