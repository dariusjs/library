# Library Demo with Item Collections

The code in this application is not intended for production use. For production cases concerns need to be taken care of such as cleanly paging through records, routing data through an API, taking care of rate limiting factors and load.

## Examples of the Library

## Requiurements
* installed docker
* yarn
* nodejs runtime
* an available (dummy )AWS credential set for the data preload scripts.

## Getting Started

```
yarn devDb
```

## Required Local DynamoDB
The project requires a local DynamoDB which can be executed through either:

```
yarn dynamo

or 

sudo docker run  -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb
```

## Run the Next.js server

Once the Data is preloaded you can then run the next.js server or skip the above step and just run yarn devDb which will also preload the data at the same time.

```
yarn dev

or 

yarn devDb  (to preload the DynamoDB at the same time)
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




### DynamoDB WorkBench File
We have a DynamoDB Workbench file that can be used to preload sample data into the local DynamoDB file.

[WorkBench FIle](./architecture/library.json)
