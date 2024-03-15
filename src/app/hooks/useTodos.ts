import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { NewTodo, Todo } from "@/types";
import { addTodo, deleteTodo, getTodos, toggleTodo } from "@/apis/todos";

const QUERY_KEY = "todos";

export const useTodos = () => {
  const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: [QUERY_KEY],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo: NewTodo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousTodos = queryClient.getQueryData<Todo[]>([QUERY_KEY])!;

      queryClient.setQueryData([QUERY_KEY], (old: Todo[]) => [newTodo, ...old]);
      return { previousTodos };
    },
  });

  const updateMutation = useMutation({
    mutationFn: toggleTodo,
    onMutate: async (todoId: string) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousTodos = queryClient.getQueryData<Todo[]>([QUERY_KEY])!;
      const newTodos = previousTodos.map((todo) => ({
        ...todo,
        ...(todo.id === todoId && { isDone: !todo.isDone }),
      }));
      queryClient.setQueryData([QUERY_KEY], newTodos);
      return { previousTodos };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (todoId: string) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousTodos = queryClient.getQueryData<Todo[]>([QUERY_KEY])!;
      const newTodos = previousTodos.filter((todo) => todo.id !== todoId);
      queryClient.setQueryData([QUERY_KEY], newTodos);
      return { previousTodos };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return {
    todos,
    isLoading,
    error,
    addTodo: addMutation.mutate,
    updateTodo: updateMutation.mutate,
    deleteTodo: deleteMutation.mutate,
  };
};
