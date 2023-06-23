import { PutCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { documentClientPut, query } from './dynamo';
import { TurbineReadingsType, WindFarmType, WindTurbineType } from './types/storage';

export async function authorDetailQuery(pk: string): Promise<any> {
  console.log(pk);
  const data = await query({
    TableName: 'library',
    KeyConditionExpression: '#pk = :pk ',
    ExpressionAttributeNames: { '#pk': 'PK1' },
    ExpressionAttributeValues: { ':pk': `AUTHOR#${pk}` }
  });
  console.log(data);
  console.log('END');
  return data.Items!;
}

export async function authorQuery(pk: string): Promise<any> {
  const data = await query({
    TableName: 'library',
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: { '#pk': 'PK1' },
    ExpressionAttributeValues: { ':pk': `AUTHOR#${pk}` }
  });
  return data.Items!;
}

export async function authorsQuery(): Promise<any> {
  const data = await query({
    TableName: 'library',
    IndexName: 'GSI3',
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: { '#pk': 'GSI3PK1' },
    ExpressionAttributeValues: { ':pk': 'TYPE#AUTHOR' }
  });
  console.log(data.Items!);
  return data.Items!;
}

export async function topicsQuery(): Promise<any> {
  const data = await query({
    TableName: 'library',
    IndexName: 'GSI5',
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: { '#pk': 'GSI5PK1' },
    ExpressionAttributeValues: { ':pk': 'TYPE#TOPIC' }
  });
  return data.Items!;
}

export async function topicDetailQuery(sk: string): Promise<any> {
  const data = await query({
    TableName: 'library',
    IndexName: 'GSI5',
    KeyConditionExpression: '#pk = :pk And begins_with(#sk, :sk)',
    ExpressionAttributeNames: { '#pk': 'GSI5PK1', '#sk': 'GSI5SK1' },
    ExpressionAttributeValues: { ':pk': 'TYPE#TOPIC', ':sk': `TOPIC#${sk}` }
  });
  return data.Items!;
}

export async function publicationsQuery(): Promise<any> {
  const data = await query({
    TableName: 'library',
    IndexName: 'GSI4',
    KeyConditionExpression: '#pk = :pk And begins_with(#sk, :sk)',
    ExpressionAttributeNames: { '#pk': 'GSI4PK1', '#sk': 'GSI4SK1' },
    ExpressionAttributeValues: { ':pk': 'TYPE#PUB', ':sk': 'TYPE#PUBLICATION' }
  });
  return data.Items!;
}

export async function publicationDetailQuery(item: string): Promise<any> {
  const data = await query({
    TableName: 'library',
    IndexName: 'GSI2',
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: { '#pk': 'GSI2PK1' },
    ExpressionAttributeValues: { ':pk': `PUBLICATION#${item}` }
  });
  return data.Items!;
}

export async function journalsQuery(): Promise<any> {
  const data = await query({
    TableName: 'library',
    IndexName: 'GSI4',
    KeyConditionExpression: '#pk = :pk And begins_with(#sk, :sk)',
    ExpressionAttributeNames: { '#pk': 'GSI4PK1', '#sk': 'GSI4SK1' },
    ExpressionAttributeValues: { ':pk': 'TYPE#PUB', ':sk': 'TYPE#JOURNAL' }
  });
  return data.Items!;
}

export async function journalDetailQuery(item: string): Promise<any> {
  const data = await query({
    TableName: 'library',
    IndexName: 'GSI2',
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: { '#pk': 'GSI2PK1' },
    ExpressionAttributeValues: { ':pk': `JOURNAL#${item}` }
  });
  return data.Items!;
}

export async function createAsset<AssetType>(items: AssetType) {
  const data: PutCommandInput = await documentClientPut({
    TableName: 'windfarm',
    Item: items,
    ConditionExpression: 'attribute_not_exists(pk)'
  });
  return data;
}
