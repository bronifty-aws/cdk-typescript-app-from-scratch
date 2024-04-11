import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// const ddbClient = new DynamoDBClient({});

// needs TABLE_NAME
interface DynamoDBServiceProps {
  id: string;
  location: string;
}

class DynamoDBService {
  private static instance: DynamoDBService;
  private client: DynamoDBClient;

  private constructor() {
    // Initialize the DynamoDB client
    this.client = new DynamoDBClient({});
  }

  public static getInstance(): DynamoDBService {
    if (!DynamoDBService.instance) {
      DynamoDBService.instance = new DynamoDBService();
    }
    return DynamoDBService.instance;
  }

  // public async getItem(tableName: string, key: any): Promise<any> {
  //   const params: DynamoDB.DocumentClient.GetItemInput = {
  //     TableName: tableName,
  //     Key: key,
  //   };

  //   try {
  //     const result = await this.client.get(params).promise();
  //     return result.Item;
  //   } catch (error) {
  //     console.error("Error retrieving item from DynamoDB:", error);
  //     throw error;
  //   }
  // }

  public async putItem(props: DynamoDBServiceProps): Promise<void> {
    try {
      await this.client.send(
        new PutItemCommand({
          TableName: process.env.TABLE_NAME,
          Item: {
            id: {
              S: props.id,
            },
            location: {
              S: props.location,
            },
          },
        })
      );
    } catch (error) {
      console.error("Error putting item into DynamoDB:", error);
      throw error;
    }
  }

  // Add more methods as needed...
}

export default DynamoDBService;
