import React from 'react';
import AppContext from '../context';
import Constants from '../constants';
import CurrentMDExtension from './extensions/CurrentMDExtension';
import PDFExtension from './extensions/PdfExtension';
import VideoExtension from './extensions/VideoExtension';


class ExtensionViewer extends React.Component {
    handleClick = (e) => {
        e.preventDefault();
        this.context.changeExtension(e.target.dataset.extension);
    }

    showExtensions = () => {
        return Object.values(Constants.EXTENSIONS).map((extension, idx) => {
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
        });
    }

    showSelectedExtension = () => {
        switch (this.context.extension) {
        case Constants.EXTENSIONS.MARKDOWN:
            return <CurrentMDExtension note=''></CurrentMDExtension>;
        case Constants.EXTENSIONS.PDF:
            return <PDFExtension></PDFExtension>;
        case Constants.EXTENSIONS.VIDEO:
            return <VideoExtension></VideoExtension>;
        default:
            return <CurrentMDExtension note=''></CurrentMDExtension>;
        }
    }

    render() {
        return (
            <div
                id='extension-viewer'
            >
                <div
                    id='extension-btns'
                >
                    {
                        this.showExtensions()
                    }
                </div>

                {
                    this.showSelectedExtension()
                }
            </div>
        );
    }
}

ExtensionViewer.contextType = AppContext;

export default ExtensionViewer;
