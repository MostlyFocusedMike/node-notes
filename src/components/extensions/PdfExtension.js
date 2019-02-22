import React from 'react';
import AppContext from '../../context';


class PDFExtension extends React.Component {
    render() {
        return (
            <div
                id='pdf-extension'
            >
                <iframe
                    src="http://localhost:8100"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
        );
    }
}

PDFExtension.contextType = AppContext;

export default PDFExtension;
