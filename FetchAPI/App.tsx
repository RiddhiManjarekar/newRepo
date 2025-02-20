import { useState } from "react";

function App() {
  const [inputId, setInputId] = useState<string>("");
  const [post, setPost] = useState<{ id: number; title: string; body: string } | null>(null);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const handleFetchPost = async () => {
    if (!inputId) {
      alert("Please enter a valid Post ID.");
      return;
    }

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${inputId}`);
      if (!response.ok) throw new Error("Post not found");

      const data = await response.json();
      setPost(data);
    } catch (error) {
      setPost(null);
      alert("Error fetching post.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPost.title || !newPost.body) {
      alert("Please enter both title and body.");
      return;
    }

    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      alert("Post request done successfully!");
      setNewPost({ title: "", body: "" }); 
    } catch (error) {
      alert("Error submitting post.");
    }
  };

  return (
    <div>
      <h2>Fetch Post by ID</h2>
      <input type="number" placeholder="Enter Post ID" value={inputId} onChange={(e) => setInputId(e.target.value)}/>
      <button onClick={handleFetchPost}>Get</button>

      {post && (
        <div>
          <h3>Post Details</h3>
          <p>ID: {post.id}</p>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
        </div>
      )}

      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Post</legend>

          <input 
            type="text" 
            placeholder="Title" 
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <br/>
          <textarea
            placeholder="Body"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
