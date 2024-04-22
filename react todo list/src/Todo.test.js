import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Todo } from './Todo';

it('Todo renders without crashing', () => {
    render(<Todo id={1} task="Test Task" removeTodo={() => { }} />);
});

it('Todo snapshot', () => {
    const tree = renderer.create(<Todo id={1} task="Test Task" removeTodo={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
});
