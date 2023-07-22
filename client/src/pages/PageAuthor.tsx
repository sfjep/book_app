import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PageAuthor = () => {
  const { name } = useParams<{ name: string }>();
  const [bio, setBio] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${name}&origin=*`
        );
        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];

        // Check if the page exists and has a valid extract
        if (pageId && pages[pageId].extract) {
          setBio(pages[pageId].extract);
        } else {
          setBio("No wiki page found...");
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        setBio("Error while fetching data from Wikipedia API.");
      }
    };

    fetchData();
  }, [name]);

  return (
    <div>
      <h1>{name}</h1>
      {bio ? <div dangerouslySetInnerHTML={{ __html: bio }} /> : <p>{bio}</p>}
    </div>
  );
};

export default PageAuthor;
