import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import AddTask from './AddTask';

configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';


describe('Add Task Component testing', ()=>{
    let wrapper;
    
    beforeEach(()=>{
        wrapper = render(<AddTask/>)
    })

    test('render the add task button',()=>{
        expect(wrapper.find('button').text()).toBe('+ Add Task')
    })
    test('change state to open modal on button click', ()=>{
        wrapper = shallow(<AddTask/>)
        wrapper.find('.button').simulate('click')
        expect(wrapper.find('#custommodal')).toHaveLength(0)
    })
    it('matches snapshot',()=>{
        const tree = renderer.create(<AddTask />).toJSON();
        expect(tree).toMatchSnapshot()
    })
})