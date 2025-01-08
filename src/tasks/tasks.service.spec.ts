import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTestsRepository  = () => ({
    getTasks: jest.fn(),
    getTaskById: jest.fn(),
    createTask: jest.fn(),
    deleteTask: jest.fn(),
    updateStatus: jest.fn(),
});

const mockUser = {
    username: 'Thiago',
    id: 'idautogerado',
    password: 'senhaqualquer',
    tasks: []
}

const mockTask = {
    title: 'Test title',
    description: 'Test desc',
    id: 'someid',
    status: TaskStatus.OPEN
};

const mockCreateTaskDto = {
    title: 'Task title',
    description: 'Task description'
}

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRepository, useFactory: mockTestsRepository }
            ],
        }).compile();
    
        tasksService = await module.get(TasksService);
        tasksRepository = await module.get(TasksRepository);
    })

    describe('getTasks', () => {
        it('calls TasksRepository.getTasks and returns the result', async () => {
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null, mockUser);
            expect(result).toEqual('someValue');
        })
    })

    describe('getTaskById', () => {
        it('calls TasksRepository.findOne and returns the result', async () => {
            tasksRepository.getTaskById.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('someId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('calls TasksRepository.findOne and handles the error', async () => {
           tasksRepository.getTaskById.mockResolvedValue(null);
           expect(tasksService.getTaskById('someid', mockUser)).rejects.toThrow(NotFoundException); 
        });
    })

    describe('createTask', () => {
        it('calls TasksRepository.createTask and returns created Task', async () => {
            tasksRepository.createTask.mockResolvedValue(mockTask);
            const result = await tasksService.createTask(mockCreateTaskDto, mockUser);
            expect(result).toEqual(mockTask);
        })
    })

    describe('deleteTask', () => {
        it('calls TasksRepository.deleteTask', () => {
            tasksRepository.deleteTask.mockResolvedValue(null);
            tasksService.deleteTask('someId', mockUser);
        })
    })
    
    describe('updateStatus', () => {
        it('calls TasksRepository.updateStatus', async () => {
            tasksRepository.updateStatus.mockResolvedValue(mockTask);
            const result = await tasksService.updateStatus('someId', TaskStatus.IN_PROGRESS, mockUser);
            expect(result).toEqual(mockTask)
        })
    })
})