import { topicDetailQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useMemo, useState } from 'react';
import { WindTurbineType } from '../server/types/storage';
import Link from 'next/link';
import { windTurbine, value } from '../server/types/api';

function TopicDetails({ topicDetail }: any) {
  const columns = useMemo(
    () => [
      {
        Header: 'Author',
        accessor: 'col1',
        Cell: ({ value }: value) => <Link href={{ pathname: 'authorDetails', query: { author: value } }}>{value}</Link>
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
      const topicDetails = topicDetail.map((element: any) => {
        return {
          col1: element.AUTHOR,
          col2: element.PUBLICATION,
          col3: element.JOURNAL,
          col4: element.TOPIC
          // col2: element.manufacturer,
          // col3: element.model,
          // col4: element.location,
          // col5: element.windfarm
        };
      });
      setData(topicDetails);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export async function getServerSideProps({ query }: any) {
  const sk = query.topic;

  const topicDetail = await topicDetailQuery(sk);
  return { props: { topicDetail } };
}

export default TopicDetails;
