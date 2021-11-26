import "./styles/App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import uniqid from "uniqid";

function App() {
  const [post, setPost] = useState({ title: "", body: "" });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getBlogPosts();
  }, []);

  const getBlogPosts = () => {
    axios
      .get("/api")
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(`Error: ${error}`));
  };

  const displayBlogPosts = (posts) => {
    if (!posts.length) return null;

    return posts.map((post) => {
      return (
        <li key={uniqid()}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </li>
      );
    });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPost({ ...post, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      title: post.title,
      body: post.body,
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => console.log("Post Submitted"))
      .then(() => setPost({ title: "", body: "" }))
      .then(() => getBlogPosts())
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <main className="App">
      <header>
        <form onSubmit={submit}>
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            type="text"
            value={post.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="body">Body:</label>
          <textarea
            name="body"
            value={post.body}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
        <h1>Blog Posts</h1>
      </header>
      <ul className="blog-posts">{displayBlogPosts(posts)}</ul>
    </main>
  );
}

export default App;
