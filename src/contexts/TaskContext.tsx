
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from '@/types';
import { mockTasks } from '@/data/mockData';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  getTasksByAgent: (agentType: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>): Task => {
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [...prev, newTask]);
    console.log('New task created:', newTask);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  const getTasksByAgent = (agentType: string) => {
    return tasks.filter(task => task.assignedAgent === agentType);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      removeTask,
      getTaskById,
      getTasksByAgent
    }}>
      {children}
    </TaskContext.Provider>
  );
};
