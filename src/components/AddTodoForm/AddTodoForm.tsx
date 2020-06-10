import React, { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { addTodoAction } from '../../actions';
import { IState } from '../../redux/reducer';

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
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>
                        <p>Description</p>
                        <textarea name="description" onChange={this.onChange} value={description} required />
                    </label>
                    <label>
                        <p>Due Date</p>
                        <input name="dueDate" onChange={this.onChange} value={dueDate} type="datetime-local" required />
                    </label>
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