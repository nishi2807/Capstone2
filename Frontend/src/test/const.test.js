import React from "react";
import { shallow } from 'enzyme';
import Button from "../Components/Button/button";
import Divider from "../Components/Divider/divider";

describe('Button Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper.exists()).toBe(true);
      });

    it('renders button with correct title', () => {
      const title = 'Click me';
      const wrapper = shallow(<Button title={title} />);
      
      // Check if the button has the correct class
      expect(wrapper.find('.btn')).toHaveLength(1);
  
      // Check if the button has the correct title
      expect(wrapper.text()).toEqual(title);
    });
  });

  describe('Divider Component', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<Divider />);
      expect(wrapper.exists()).toBe(true);
    });
  
    it('renders the correct CSS class', () => {
      const wrapper = shallow(<Divider />);
      expect(wrapper.hasClass('divider')).toBe(true);
    });
  });

  