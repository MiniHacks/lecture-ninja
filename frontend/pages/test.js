import * as React from 'react';
import Words from '../components/Words'
import Header from '../components/Header'


export default function Test() {
    const lorem_ipsum = "Lorem ipsum dolor sit amet, consecteturadipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    return (
        <>
            <Header>This is my heading</Header>
            <Words speaker="hell" words={lorem_ipsum} />
        </>
    );
}
