import React, { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";

const DATA = [
  {
    record: {
      username: "AlxSavage",
      name: "Alex",
      meta: {
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1484376958611845127/u4qLzOSz_normal.jpg",
      },
    },
    highlight: {
      name: "<em>Alex</em>",
    },
  },
];

export default function App() {
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 300);

  const { data } = useQuery({
    queryKey: ["search", debouncedTerm],
    queryFn: () => {
      return DATA;
    },
    enabled: Boolean(debouncedTerm),
  });

  const searchResults = data || [];

  return (
    <main>
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="search-field">Search accounts: </label>
        <input
          id="search-field"
          type="search"
          value={term}
          placeholder="Search accounts: name or username"
          onChange={(event) => {
            setTerm(event.target.value);
          }}
        />
      </form>

      <ul>
        {searchResults.map(({ record, highlight }) => {
          return (
            <li key={record.username}>
              <a href={`http://twitter.com/${record.username}`}>
                <img src={record.meta.profile_image_url} aria-hidden={true} />
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlight.name || record.name,
                  }}
                />
                <br />
                @
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlight.username || record.username,
                  }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
