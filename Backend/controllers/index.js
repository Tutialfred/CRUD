const axios = require("axios");

const getAllCharacters = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      return response.data.results;
    } catch (error) {
      throw error;
    }
  };


