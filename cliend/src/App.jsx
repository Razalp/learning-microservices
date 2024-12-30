import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css'
const App = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [commentText, setCommentText] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  useEffect(() => {
    if (selectedPostId) {
      axios.get(`http://localhost:4000/comments/${selectedPostId}`)
        .then((response) => setComments(response.data))
        .catch((error) => console.error('Error fetching comments:', error));
    }
  }, [selectedPostId]);

  const handleAddPost = () => {
    axios.post('http://localhost:3000/posts', { title: postTitle, content: postContent })
      .then((response) => {
        setPosts([...posts, response.data]);
        setPostTitle('');
        setPostContent('');
      })
      .catch((error) => console.error('Error adding post:', error));
  };

  const handleAddComment = () => {
    if (!selectedPostId) {
      alert('Please select a post to comment on!');
      return;
    }
    axios.post('http://localhost:4000/comments', { postId: selectedPostId, text: commentText })
      .then((response) => {
        setComments([...comments, response.data]);
        setCommentText('');
      })
      .catch((error) => console.error('Error adding comment:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Social Posts</h1>

        {/* Add Post Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Create New Post</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Post Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              placeholder="Post Content"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddPost}
                className="bg-blue-600 text-white font-bold text-sm uppercase px-6 py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform transform"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <h3 
                  className="text-lg font-bold text-gray-700 mb-4 cursor-pointer hover:text-blue-600"
                  onClick={() => setSelectedPostId(post._id)}
                >
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.content}</p>

                {/* Comments Section */}
                {selectedPostId === post._id && (
                  <div className="mt-6">
                    <div className="border-t pt-4">
                      <h4 className="text-md font-bold text-gray-700 mb-4">Comments</h4>
                      
                      {/* Add Comment Form */}
                      <div className="flex gap-4 mb-6">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleAddComment}
                          className="bg-blue-600 text-white font-bold text-sm uppercase px-6 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform transform"
                        >
                          Comment
                        </button>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-600">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;