const Destination = () => {
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center py-10">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-10">
          Explore Destinations
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="card bg-blue-100 shadow-xl">
            <figure>
              <img
                src="https://via.placeholder.com/300"
                alt="Destination 1"
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Destination 1</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>

          <div className="card bg-blue-100 shadow-xl">
            <figure>
              <img
                src="https://via.placeholder.com/300"
                alt="Destination 2"
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Destination 2</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>

          <div className="card bg-blue-100 shadow-xl">
            <figure>
              <img
                src="https://via.placeholder.com/300"
                alt="Destination 3"
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Destination 3</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>

          <div className="card bg-blue-100 shadow-xl">
            <figure>
              <img
                src="https://via.placeholder.com/300"
                alt="Destination 4"
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Destination 4</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
