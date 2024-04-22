import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { TodoList } from './TodoList';

it('TodoList renders without crashing', () => {
    render(<TodoList />);
});

it('TodoList snapshot', () => {
    const tree = renderer.create(<TodoList />).toJSON();
    expect(tree).toMatchSnapshot();
});
