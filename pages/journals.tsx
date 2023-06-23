import { journalsQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useState } from 'react';
import { value } from '../server/types/api';
import Link from 'next/link';

function Journals({ journals }: any) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Journals',
        accessor: 'col1',
        Cell: ({ value }: value) => (
          <Link href={{ pathname: 'journalDetails', query: { journal: value } }}>{value}</Link>
        )
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const allJournals = journals.map((element: any) => {
        return {
          col1: element.JOURNAL,
          col2: element.TOPICS
        };
      });
      setData(allJournals);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const journals = await journalsQuery();
  return { props: { journals } };
}

export default Journals;
