import React, { useState as useStateMock } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Search from '.././components/Search';
import Enzyme, { shallow, mount} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });

const setUp = () => {
  return shallow(<Search />);
};
jest.mock('axios');

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

const url = (inputValue) => {'http://www.omdbapi.com/?apikey=2ebda52d&t=${inputValue}'};

describe('Search component', () => {
  let onInputChange = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Search />);
  });
  
  it('renders', ()=> {
    // console.log(wrapper.debug());
    expect(wrapper).not.toBeNull();
  })
  
  it('show default value', ()=> {
    let input = findByTestAttr(wrapper, 'testInput');
    expect(input.props().value).toEqual('');
  })
  
  it('change input value', ()=> {
    let input = findByTestAttr(wrapper, 'testInput');
    // console.log(input);
    expect(input.length).toBe(1);
    
  })

  test('check if form renders', () => {
    const wrapper = setUp();
    const form = findByTestAttr(wrapper, 'form');
    expect(form.length).toBe(1);
  });

  test('check button rendering', () => {
    let button = findByTestAttr(wrapper, 'testButton');
    expect(button.length).toBe(1);
  });

  test('check api call on button click', () => {
    let button = findByTestAttr(wrapper, 'testButton');
    let input = findByTestAttr(wrapper, 'testInput');

    button.simulate('click');
    let inputUrl = url(input.props().value);

    // create mock api call
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Harry Potter and the Deathly Hallows: Part 2'
        }
      ]
    });
    

  });

});

