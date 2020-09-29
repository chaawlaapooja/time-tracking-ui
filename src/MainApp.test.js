import React from 'react';
import PrivateHeader from './components/PrivateHeader';
import { cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';

// it('renders without crashing',()=>{
//     const div = document.createElement('div');
//     ReactDOM.render(<MainApp />, div)
// })
afterEach(cleanup)

it('app has private header',()=>{
    render(<PrivateHeader/>)
})

it('matches snapshot',()=>{
    const tree = renderer.create(<PrivateHeader title='Task time tracking app'/>).toJSON();
    expect(tree).toMatchSnapshot()
})