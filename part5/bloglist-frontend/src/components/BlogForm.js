const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => (
  <div>
    <h2>Create New Blog</h2>
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input name="title" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        author:
        <input name="author" value={author} onChange={handleAuthorChange} />
      </div>
      <div>
        url:
        <input name="url" value={url} onChange={handleUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
);

export default BlogForm;
