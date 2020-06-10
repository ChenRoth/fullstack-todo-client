import React from 'react';
import { TodoList } from '../../components/TodoList/TodoList';
import { AddTodoForm } from '../../components/AddTodoForm/AddTodoForm';

export class TodosPage extends React.Component {
    render() {
        return (
            <div>
                <h4>Add a new TODO</h4>
                <AddTodoForm />
                <h4>Your TODO List</h4>
                <TodoList />
            </div>
        );
    }
}
