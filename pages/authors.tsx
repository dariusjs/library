import { authorsQuery, windFarmQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useState } from 'react';
import { WindFarmType } from '../server/types/storage';
import { windFarm, value } from '../server/types/api';
import Link from 'next/link';

function Authors({ authors }: any) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Author',
        accessor: 'col1',
        Cell: ({ value }: value) => <Link href={{ pathname: 'authorDetails', query: { author: value } }}>{value}</Link>
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const allAuthors = authors.map((element: any) => {
        return {
          col1: element.AUTHOR
        };
      });
      setData(allAuthors);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const authors = await authorsQuery();
  return { props: { authors } };
}

export default Authors;
