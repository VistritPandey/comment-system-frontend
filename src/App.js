import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [editCommentText, setEditCommentText] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/comments/')
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

  const handleEdit = async (id, newText) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/comments/${id}/`, { text: newText });
      setComments(comments.map(comment => (comment.id === id ? response.data : comment)));
      setEditCommentId(null);
      setEditCommentText('');
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/comments/', {
        text: newCommentText,
        author: 'Admin',
      });
      setComments([...comments, response.data]);
      setNewCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${id}/`);
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {editCommentId === comment.id ? (
              <>
                <input
                  type="text"
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                />
                <button onClick={() => handleEdit(comment.id, editCommentText)}>Save</button>
              </>
            ) : (
              <>
                <p>{comment.text}</p>
                <p>Author: {comment.author}</p>
                <p>Date: {comment.date}</p>
                <p>Likes: {comment.likes}</p>
                {comment.images && <img src={comment.images} alt="Comment Image" />}
                <button onClick={() => setEditCommentId(comment.id)}>Edit</button>
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
      />
      <button onClick={handleAdd}>Add Comment</button>
    </div>
  );
};

export default App;