"use client";
import { useState, useEffect } from "react";
import { List } from "@/lib/apiTypes";

import Link from "next/link";
import { LuSearch } from "react-icons/lu";

interface SearchListsProps {
  initialLists: List[];
}

export const SearchLists = ({ initialLists }: SearchListsProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<List[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults(initialLists);
    } else {
      const results = initialLists.filter((list) =>
        list.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, initialLists]);

  const isSearchResultNotZero =
    isActive && searchTerm && searchResults.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsActive(true);
  };
  return (
    <div className=" w-full relative ">
      <div
        className={`w-full flex flex-row justify-between items-center border-gray-300  p-1 text-sm bg-white gap-2 ${
          isSearchResultNotZero
            ? "border-t-2 border-l-2 border-r-2 rounded-t-md"
            : "border-2 rounded-md"
        } `}
      >
        <input
          type="text"
          placeholder="Search lists"
          value={searchTerm}
          onChange={handleChange}
        />
        <LuSearch />
      </div>
      {isSearchResultNotZero ? (
        <div className="flex flex-col gap-2  bg-white absolute  left-0 w-full border-t-0 border-2 border-gray-300 rounded-b-md p-1 z-10">
          {searchResults.map((list) => (
            <div key={list.Id} className="flex flex-row ">
              <Link
                href={`/lists/${list.Id}`}
                className="text-s flex flex-row justify-between items-center w-full gap-4 text-sm"
                onClick={() => {
                  setIsActive(false);
                  setSearchTerm("");
                }}
              >
                {list.Name}
                <div className="border-2 px-1 py-0  rounded-md text-xs">
                  {list.TodoCount}
                </div>
              </Link>
            </div>
          ))}{" "}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
