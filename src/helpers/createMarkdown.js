import marked from 'marked';
import toggleHighlighting from './toggleHighlighting';

const renderWelcome = () => {
    /* create the welcome message */
    return `
# hello there
## start adding markdown to get started
- don't know where to start? check out the main help page I have yet to write
- [This markdown crash course](http://blog.kugghuset.se/2015/11/20/markdown-crash-course.html) teaches you how to use it in like 5 minutes`;
};

const createMarkdown = (text, useHighlighting) => {
    /* returns the final markdown */
    toggleHighlighting(marked, useHighlighting); // we only want marked to use special highlighing when not in edit mode
    const md = text || renderWelcome();
    return marked(md);
};

export default createMarkdown;
