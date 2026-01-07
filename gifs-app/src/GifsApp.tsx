//import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
//import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
//import type { Gif } from "./gifs/interfaces/gif.interface";
import { useGifs } from "./gifs/hooks/useGifs";
export const GifsApp = () => {
  const { handleSearch, handleTermClicked, previousTerms, gifs } = useGifs();
  return (
    <>
      {/*Header*/}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif"
      />
      {/*Search */}
      <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />
      {/* Busquedas previas*/}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />
      {/*Gifs*/}
      <GifList gifs={gifs} />
    </>
  );
};
