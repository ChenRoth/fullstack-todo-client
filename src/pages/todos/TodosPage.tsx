import React from 'react';
import { TodoList } from '../../components/TodoList/TodoList';
import { AddTodoForm } from '../../components/AddTodoForm/AddTodoForm';

export class TodosPage extends React.Component {
    render() {
        return (
            <div>
                <AddTodoForm />
                <TodoList />
            </div>
        );
    }
}
