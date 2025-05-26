import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="mt-2 text-gray-500 italic">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>

      {error.status === 404 && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </h3>
          <p className="mt-2 text-gray-600">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      )}

      <div className="mt-10">
        <img
          src="https://i.ibb.co.com/3fQRYty/404-error-page-not-found-tiny-people-vector-51588159.jpg"
          alt="Error illustration"
          className="rounded-xl shadow-lg "
        />
      </div>
    </div>
  );
};

export default ErrorPage;