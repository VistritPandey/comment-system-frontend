import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [editCommentText, setEditCommentText] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [likes, setLikes] = useState(0);

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

  const handLikes = async () => {
    //intially it is saved as the order of date
    //first time i CLICK SORT THEN IT WILL BE SORTED BY LIKES
    //SECOND TIME I CLICK SORT THEN IT WILL BE SORTED BY DATE
    let bool=true;
    if(likes===0){
      try {
        const response = await axios.get('http://localhost:8000/api/comments/');
        setComments(response.data.sort((a, b) => b.likes - a.likes));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
      setLikes(1);
      bool=false;
    }
    else{
      try {
        const response = await axios.get('http://localhost:8000/api/comments/');
        setComments(response.data.sort((a, b) => b.date - a.date));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
      setLikes(0);
      //bool=true;
    }
    
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
    <h1 className="text-3xl text-center font-bold mb-4">Comments</h1>
    <div className="mt-4">
      <input
        type="text"
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        className="border p-2 mr-2"
        />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        >
        Add Comment
      </button>
        <button onClick={handLikes}>Sort</button>
    </div>
    <ul>
      {comments.map(comment => (
        <li key={comment.id} className="border p-4 mb-4">
          {editCommentId === comment.id ? (
            <>
              <input
                type="text"
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
                className="border p-2 mr-2"
              />
              <button
                onClick={() => handleEdit(comment.id, editCommentText)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p>Description: {comment.text}</p>
              <p>Author: {comment.author}</p>
              <p>Date: {comment.date}</p>
              <p>Likes: {comment.likes}</p>
              {comment.image && 
                <img
                    src={comment.image}
                    alt={comment.image}
                    style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                />
              }
              <div className="mt-4">
                <button
                  onClick={() => setEditCommentId(comment.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>

    
  </div>
  );
};

export default App;