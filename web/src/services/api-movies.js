// login


const getMoviesFromApi = (movies) => {
  console.log('movies');
  const genderParam = movies.gender;
  const queryParams = `?gender=${genderParam}`;

  return fetch('//localhost:4000/movies' + queryParams)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;

