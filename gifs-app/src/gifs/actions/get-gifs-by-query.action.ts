import axios from "axios";
import type { GiphyResponse } from "../interfaces/giphy.response";

export const getGifsByQuery = async (query: string) => {
  const response = await axios.get<GiphyResponse>(
    "https://api.giphy.com/v1/gifs/search?",
    {
      params: {
        q: query,
        limit: 10,
        lang: "es",
        api_key: "xwRSO0ShtpJEHj5CHYJonaVlIat07VuO",
      },
    },
  );
  console.log(response.data);
  // fetch(
  //   `https://api.giphy.com/v1/gifs/search?api_key=xwRSO0ShtpJEHj5CHYJonaVlIat07VuO&q=${query}&limit=25&offset=0&rating=g&lang=es&bundle=messaging_non_clips`,
  // );
};
