import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskWithSameTitle = tasks.filter(item => item.title === newTaskTitle);

    if (taskWithSameTitle) return Alert.alert('Task já cadastrada', 'Você não pode cadastrar tasks com o mesmo nome')

    const newTask = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    };

    setTasks(oldTasks => [...oldTasks, newTask]);
  };

  function handleToggleTaskDone(id: number) {
    const taskEdited = tasks.map(item => {
      if (item.id === id) item.done = !item.done;
      return item;
    });

    setTasks(taskEdited);
  };

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(item => {
      if (item.id != id) return item;
    }));
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})