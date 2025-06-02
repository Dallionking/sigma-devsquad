
import { useState, useCallback } from 'react';
import { Task } from '@/types';

export const useDragAndDrop = () => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = useCallback((task: Task) => {
    setDraggedTask(task);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    
    try {
      const taskData = e.dataTransfer.getData('task');
      if (taskData) {
        const task = JSON.parse(taskData) as Task;
        if (task.status !== newStatus) {
          // Here you would update the task status
          console.log(`Moving task ${task.id} to ${newStatus}`);
        }
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    } finally {
      setDraggedTask(null);
    }
  }, []);

  return {
    draggedTask,
    handleDragStart,
    handleDragOver,
    handleDrop
  };
};
