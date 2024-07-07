import { useLoaderData } from "react-router-dom";

const News = () => {
  const news = useLoaderData();
  console.log(news);
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <p>{article.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary capitalize">
                  read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
