import React from 'react';
import { connect } from 'react-redux';
import { toggleCompleteAction, deleteTodo as deleteTodoAction } from '../../actions';
import { ITodo } from '../../models/todo';
import moment from 'moment';
import './Todo.css';

interface TodoProps extends ITodo {
    toggleComplete(id: number): void;
    deleteTodo(id: number): void;
 }

class _Todo extends React.Component<TodoProps> {
    render() {
        const {description, dueDate, creationDate, complete} = this.props;
        return (
            <div className={['todo', complete ? 'complete' : ''].join(' ')}>
                <h4>{description}</h4>
                <p>due by {moment(dueDate).format('DD-MM-YYYY HH:mm')}</p>
                <p>created on {moment(creationDate).format('DD-MM-YYYY HH:mm')}</p>
                <input type="checkbox" checked={complete} onChange={this.onToggleComplete} />
                <button className="delete-btn" onClick={this.onDelete}>X</button>
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