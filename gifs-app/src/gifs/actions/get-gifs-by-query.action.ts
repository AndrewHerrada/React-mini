export const getGifsByQuery = async (query: string) => {
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=xwRSO0ShtpJEHj5CHYJonaVlIat07VuO&q=${query}&limit=25&offset=0&rating=g&lang=es&bundle=messaging_non_clips`,
  );
};
