import React, { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { addTodoAction } from '../../actions';
import { IState } from '../../redux/reducer';
import './AddTodoForm.css';

interface AddTodoFormProps {
    isAddingTodo: boolean;
    add(description: string, dueDate: Date): void;
}

interface AddTodoFormState {
    description: string;
    dueDate: string;
}

export class _AddTodoForm extends React.Component<AddTodoFormProps, AddTodoFormState> {
    state = {
        description: '',
        dueDate: '',
    }

    render() {
        const { isAddingTodo } = this.props;
        const { description, dueDate } = this.state;
        return (
            <div className="add-todo-form">
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Description</label>
                        {' '}
                        <textarea cols={50} rows={5} name="description" onChange={this.onChange} value={description} required />
                    </div>
                    <div>
                        <label>
                            Due Date
                        </label>
                        {' '}
                        <input name="dueDate" onChange={this.onChange} value={dueDate} type="datetime-local" required />
                    </div>
                    <div>
                        <button disabled={isAddingTodo} type="submit">ADD</button>
                    </div>
                </form>
            </div>
        )
    }

    onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = e.target.name;
        this.setState<any>({
            [key]: e.target.value
        });
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { description, dueDate } = this.state;
        const { add } = this.props;
        add(description, new Date(dueDate));
    }
}

const mapStateToProps = (state: IState) => ({
    isAddingTodo: state.isAddingTodo,
});

const mapDispatchToProps = (dispatch: any) => ({
    add: (description: string, dueDate: Date) => dispatch(addTodoAction(description, dueDate)),
});

export const AddTodoForm = connect(mapStateToProps, mapDispatchToProps)(_AddTodoForm); 