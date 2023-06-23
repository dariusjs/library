import { publicationsQuery, topicsQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useState } from 'react';
import { value } from '../server/types/api';
import Link from 'next/link';

function Publications({ publications }: any) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Publications',
        accessor: 'col1',
        Cell: ({ value }: value) => (
          <Link href={{ pathname: 'publicationDetails', query: { publication: value } }}>{value}</Link>
        )
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const allPublications = publications.map((element: any) => {
        return {
          col1: element.PUBLICATION,
          col2: element.TOPICS
        };
      });
      setData(allPublications);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const publications = await publicationsQuery();
  return { props: { publications } };
}

export default Publications;
