const Blog = () => {
  const posts = [
    {
      title: "Exploring the Mountains",
      date: "June 25, 2024",
      excerpt:
        "Join us as we explore the majestic mountains and discover hidden gems along the trails.",
      imageUrl: "https://via.placeholder.com/600x400",
    },
    {
      title: "A Day in the City",
      date: "June 15, 2024",
      excerpt:
        "Experience the hustle and bustle of city life with our comprehensive guide to the top attractions.",
      imageUrl: "https://via.placeholder.com/600x400",
    },
    {
      title: "A Day in the City",
      date: "June 15, 2024",
      excerpt:
        "Experience the hustle and bustle of city life with our comprehensive guide to the top attractions.",
      imageUrl: "https://via.placeholder.com/600x400",
    },
    // Add more posts as needed
  ];
  return (
    <div className="min-h-screen bg-pink-100">
      <header className="bg-blue-50 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Travel Guru Blog</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-pink-200 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={post.imageUrl}
                alt={post.title}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{post.date}</p>
                <p className="text-gray-700">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;
