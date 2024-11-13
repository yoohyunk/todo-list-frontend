"use client";
import { useState, useEffect } from "react";
import { List } from "@/lib/apiTypes";

interface SearchListsProps {
  initialLists: List[];
}

export const SearchLists = ({ initialLists }: SearchListsProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<List[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search lists"
        value={searchTerm}
        onChange={handleChange}
        className="border-2 border-gray-300 rounded-md p-1 w-full text-center text-sm"
      />
      {searchTerm && searchResults.length > 0 ? (
        searchResults.map((list) => <div key={list.Id}>{list.Name}</div>)
      ) : (
        <div></div>
      )}
    </div>
  );
};
