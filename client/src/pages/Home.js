// Node Modules
import React, { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TODO, UPDATE_TODO_STATUS } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
// Utilities
import Auth from '../utils/auth';

const Home = () => {
  const inputRef = useRef();
  const { data, loading, refetch } = useQuery(QUERY_ME);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoStatus] = useMutation(UPDATE_TODO_STATUS);

  const user = data?.me || {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addTodo({
      variables: {
        text: inputRef.current.value
      }
    });
    await refetch();
    inputRef.current.value = "";
  }

  const handleComplete = async (id) => {
    await updateTodoStatus({
      variables: {
        id,
        status: "COMPLETE"
      }
    })
  }

  const handleInProgress = async (id) => {
    await updateTodoStatus({
      variables: {
        id,
        status: "IN_PROGRESS"
      }
    })
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Add TODO"
        />
        <button type="submit">Submit</button>
      </form>
      <section>
        {user.todos.map(todo => {
          if (todo.status === "COMPLETE") {
            return (
              <button onClick={() => handleInProgress(todo._id)} className="contrast">
                <s>{todo.text}</s>
              </button>
            );
          }
          return (
            <button onClick={() => handleComplete(todo._id)}>
              {todo.text}
            </button>
          );
        })}
      </section>
    </>
  );
};

export default Home;
