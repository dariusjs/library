import { topicsQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useState } from 'react';
import { value } from '../server/types/api';
import Link from 'next/link';

function Topics({ topics }: any) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Topic',
        accessor: 'col1',
        Cell: ({ value }: value) => <Link href={{ pathname: 'topicDetails', query: { topic: value } }}>{value}</Link>
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const allTopics = topics.map((element: any) => {
        return {
          col1: element.TOPIC
        };
      });
      setData(allTopics);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const topics = await topicsQuery();
  return { props: { topics } };
}

export default Topics;
