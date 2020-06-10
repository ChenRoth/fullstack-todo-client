import React from 'react';
import { connect } from 'react-redux';
import { ITodo } from '../../models/todo';
import { Todo } from '../Todo/Todo';
import { IState } from '../../redux/reducer';
import { getTodosAction } from '../../actions';

interface TodoListProps {
    isLoading: boolean;
    todos: ITodo[];
    getTodos(): void;
}

class _TodoList extends React.Component<TodoListProps> {
    componentDidMount() {
        const { getTodos } = this.props;
        getTodos();
    }

    render() {
        const { todos, isLoading } = this.props;
        if (isLoading) {
            return <div>Loading TODO list...</div>
        }

        return (
            <div>
                {todos.length ? todos.map(todo => <Todo key={todo.id} {...todo} />) : 'Your schedule is free!'}
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    todos: state.todos,
    isLoading: state.isLoadingTodos,
});

const mapDispatchToProps = (dispatch: any) => ({
    getTodos: () => dispatch(getTodosAction()),
})

export const TodoList = connect(mapStateToProps, mapDispatchToProps)(_TodoList);