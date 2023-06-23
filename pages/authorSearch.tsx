import { useState } from 'react';
// import AWS from 'aws-sdk';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('/api/search/author', {
        body: JSON.stringify({
          name: searchQuery
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      const { result } = await response.json();
      setSearchResult(result);
    } catch (error) {
      console.error('Error retrieving search result:', error);
    }
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch}>Submit</button>
      <div>
        <p>Search Result: {searchResult}</p>
      </div>
    </div>
  );
}
