import React from 'react';

export function EditButton(props) {
  return (
    <button onClick={props.onClick}>
      Edit
    </button>
  );
}

export function DeleteButton(props) {
  return (
    <button onClick={props.onClick}>
      Delete
    </button>
  );
}