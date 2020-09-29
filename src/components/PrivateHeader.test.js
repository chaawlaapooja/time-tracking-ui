import React from 'react';
import PrivateHeader from './PrivateHeader';
import { cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';

afterEach(cleanup)

describe('Private Header testing',()=>{
    test("render component without crashing", ()=>{
        render(<PrivateHeader/>)
    })
    it("renders the correct content", ()=>{
        const { getByText } = render(<PrivateHeader title='Task time tracking app'/>);
        getByText("Task time tracking app")
    })
    it('matches snapshot',()=>{
        const tree = renderer.create(<PrivateHeader title='Task time tracking app'/>).toJSON();
        expect(tree).toMatchSnapshot()
    })
})


it('matches snapshot',()=>{
    const tree = renderer.create(<PrivateHeader title='Task time tracking app'/>).toJSON();
    expect(tree).toMatchSnapshot()
})