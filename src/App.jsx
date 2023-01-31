import React, { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { xataWorker } from "./xata";

const searchAccount = xataWorker(
  "searchAccount",
  async ({ xata }, { term }) => {
    const results = await xata.search.all(term, {
      tables: [
        {
          table: "accounts",
          target: ["name", "username"],
        },
      ],
      fuzziness: 1,
      prefix: "phrase",
    });

    const enrichedResults = results.map((result) => {
      return {
        ...result,
        ...result.record.getMetadata(),
      };
    });

    return enrichedResults;
  }
);

export default function App() {
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 300);

  const { data: results } = useQuery({
    queryKey: ["search", debouncedTerm],
    queryFn: () => {
      return searchAccount({ term: debouncedTerm });
    },
    enabled: Boolean(debouncedTerm),
    placeholderData: [],
  });

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
        {results.map(({ record, highlight }) => {
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
