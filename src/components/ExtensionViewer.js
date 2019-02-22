import React from 'react';
import AppContext from '../context';
import Constants from '../constants';
import MDPreview from './MDPreview';


class ExtensionViewer extends React.Component {
    handleClick = (e) => {
        e.preventDefault();
        this.context.changeExtension(e.target.dataset.extension);
    }

    showSelectedExtension = () => {
        return <MDPreview note=''></MDPreview>;
    }

    render() {
        return (
            <div>
                I am the extension viewer!
                {
                    Object.values(Constants.EXTENSIONS).map((extension, idx) => {
                        return (
                            <button
                                key={idx}
                                id={`${extension}-btn`}
                                className='extension-btn'
                                onClick={this.handleClick}
                                data-extension={extension}
                            >
                                { extension }
                            </button>
                        );
                    })
                }

                {
                    this.showSelectedExtension()
                }
            </div>
        );
    }
}

ExtensionViewer.contextType = AppContext;

export default ExtensionViewer;
