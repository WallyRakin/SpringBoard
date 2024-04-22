import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { NewTodoForm } from './NewTodoForm';

it('NewTodoForm renders without crashing', () => {
    render(<NewTodoForm addTodo={() => { }} />);
});

it('NewTodoForm snapshot', () => {
    const tree = renderer.create(<NewTodoForm addTodo={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
});
