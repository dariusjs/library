import { authorDetailQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { value } from '../server/types/api';

function AuthorDetails({ authorDetail }: any) {
  const columns = useMemo(
    () => [
      {
        Header: 'Author',
        accessor: 'col1'
      },
      {
        Header: 'Publication',
        accessor: 'col2',
        Cell: ({ value }: value) => (
          <Link href={{ pathname: 'publicationDetails', query: { publication: value } }}>{value}</Link>
        )
      },
      {
        Header: 'Journal',
        accessor: 'col3',
        Cell: ({ value }: value) => (
          <Link href={{ pathname: 'journalDetails', query: { journal: value } }}>{value}</Link>
        )
      },
      {
        Header: 'Topic',
        accessor: 'col4',
        Cell: ({ value }: value) => <Link href={{ pathname: 'topicDetails', query: { topic: value } }}>{value}</Link>
      }
    ],
    []
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const authorDetails = authorDetail.map((element: any) => {
        return {
          col1: element.AUTHOR,
          col2: element.PUBLICATION,
          col3: element.JOURNAL,
          col4: element.TOPIC
        };
      });
      setData(authorDetails);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export async function getServerSideProps({ query }: any) {
  const pk = query.author;

  const authorDetail = await authorDetailQuery(pk);
  return { props: { authorDetail } };
}

export default AuthorDetails;
