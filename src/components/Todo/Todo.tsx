import React from 'react';
import { connect } from 'react-redux';
import { toggleCompleteAction, deleteTodo as deleteTodoAction } from '../../actions';
import { ITodo } from '../../models/todo';

interface TodoProps extends ITodo {
    toggleComplete(id: number): void;
    deleteTodo(id: number): void;
 }

class _Todo extends React.Component<TodoProps> {
    render() {
        const {description, dueDate, creationDate, complete} = this.props;
        return (
            <div>
                <h4>{description}</h4>
                <p>due by {dueDate}</p>
                <p>created on {creationDate}</p>
                <input type="checkbox" checked={complete} onChange={this.onToggleComplete} />
                <button onClick={this.onDelete}>X</button>
            </div>
        );
    }

    onToggleComplete = () => {
        const {toggleComplete, id} = this.props;
        toggleComplete(id);
    }

    onDelete = () => {
        const {deleteTodo, id} = this.props;
        deleteTodo(id);
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    toggleComplete: (id: number) => dispatch(toggleCompleteAction(id)),
    deleteTodo: (id: number) => dispatch(deleteTodoAction(id)),
});

export const Todo = connect(undefined, mapDispatchToProps)(_Todo);