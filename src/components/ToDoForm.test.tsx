import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToDoForm from './ToDoForm'                // <- adjust if path differs
import type { PRIORITY } from '../typesAndInterfaces'

describe('<ToDoForm />', () => {
    it('lets me type, set date, change priority, and submit', async () => {
        const user = userEvent.setup();
        let task: string = '';
        let dueDate: string | undefined;
        let priority: PRIORITY = 'medium';
        const setTask = vi.fn((v: string) => { task = v })
        const setDueDate = vi.fn((v: string) => { dueDate = v });
        const setPriority = vi.fn((v: PRIORITY) => { priority = v })
        const handleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => e.preventDefault())

        render(
            <ToDoForm
                task={task}
                dueDate={dueDate}
                priority={priority}
                setTask={setTask}
                setDueDate={setDueDate}
                setPriority={setPriority}
                handleSubmit={handleSubmit}
            />
        )
        const taskInput = screen.getByPlaceholderText(/new task/i);
        await user.type(taskInput, 'Testing new Task');
        const taskUserInputted = setTask.mock.calls.map(c => c[0]);
        const lastTaskInputEntry =  taskUserInputted.join('') as string;
        expect(lastTaskInputEntry).toContain('Testing new Task')

        const dateInput = screen.getByPlaceholderText(/due date/i);
        await user.clear(dateInput)
        await user.type(dateInput, '2030-01-01');
        expect(setDueDate).toHaveBeenCalledWith('2030-01-01')
        expect(dueDate).toBe('2030-01-01')

        const prioritySelect = screen.getByRole('combobox');
        await user.selectOptions(prioritySelect, 'high');
        expect(setPriority).toHaveBeenCalledWith('high' as PRIORITY);
        expect(priority).toBe('high');

        await user.click(screen.getByRole('button', { name: /add task/i }));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
})