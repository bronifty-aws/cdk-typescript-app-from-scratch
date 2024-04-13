import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

interface DynamoDBServiceProps {
  id?: string;
  location?: string;
}

interface IDynamoDBService {
  putItem(props: DynamoDBServiceProps): Promise<void>;
  // Uncomment and implement when needed
  // getItem(key: any): Promise<any>;
}

class DynamoDBService {
  private static instance: DynamoDBService;
  private client: DynamoDBClient;
  private tableName: string;
  private constructor({
    region,
    tableName,
  }: {
    region: string;
    tableName: string;
  }) {
    this.client = new DynamoDBClient({
      region: region,
    });
    this.tableName = tableName;
  }

  public static getInstance({
    region,
    tableName,
  }: {
    region: string;
    tableName: string;
  }): DynamoDBService {
    if (!DynamoDBService.instance) {
      DynamoDBService.instance = new DynamoDBService({ region, tableName });
    }
    return DynamoDBService.instance;
  }

  public async scanTable(): Promise<any[]> {
    try {
      const result = await this.client.send(
        new ScanCommand({
          TableName: this.tableName,
        })
      );
      return result.Items || [];
    } catch (error) {
      console.error("Error scanning DynamoDB table:", error);
      throw error;
    }
  }

  public async putItem(props: DynamoDBServiceProps): Promise<void> {
    try {
      const item: { [key: string]: { S: string } } = {};
      if (props.id) {
        item.id = { S: props.id };
      }
      if (props.location) {
        item.location = { S: props.location };
      }

      await this.client.send(
        new PutItemCommand({
          TableName: this.tableName,
          Item: item,
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

// import {
//   DynamoDBClient,
//   PutItemCommand,
//   ScanCommand,
// } from "@aws-sdk/client-dynamodb";

// // needs TABLE_NAME
// interface DynamoDBServiceProps {
//   tableName?: string;
//   id?: string;
//   location?: string;
// }

// interface IDynamoDBService {
//   putItem(props: DynamoDBServiceProps): Promise<void>;
//   // Uncomment and implement when needed
//   // getItem(tableName: string, key: any): Promise<any>;
// }

// class DynamoDBService {
//   private static instance: DynamoDBService;
//   private client: DynamoDBClient;
//   private tableName: string;

//   private constructor() {
//     this.client = new DynamoDBClient({});
//     this.tableName = process.env.TABLE_NAME || "";
//   }

//   public static getInstance(): DynamoDBService {
//     if (!DynamoDBService.instance) {
//       DynamoDBService.instance = new DynamoDBService();
//     }
//     return DynamoDBService.instance;
//   }

//   public async scanTable(): Promise<any[]> {
//     try {
//       const result = await this.client.send(
//         new ScanCommand({
//           TableName: this.tableName,
//         })
//       );
//       return result.Items || [];
//     } catch (error) {
//       console.error("Error scanning DynamoDB table:", error);
//       throw error;
//     }
//   }

//   // public async getItem(tableName: string, key: any): Promise<any> {
//   //   const params: DynamoDB.DocumentClient.GetItemInput = {
//   //     TableName: tableName,
//   //     Key: key,
//   //   };

//   //   try {
//   //     const result = await this.client.get(params).promise();
//   //     return result.Item;
//   //   } catch (error) {
//   //     console.error("Error retrieving item from DynamoDB:", error);
//   //     throw error;
//   //   }
//   // }

//   // public async putItem(props:DynamoDBServiceProps): Promise<void> {
//   //   try {
//   //     await this.client.send(
//   //       new PutItemCommand({
//   //         TableName: this.tableName,
//   //         Item: {
//   //           id: {
//   //             S: props.id,
//   //           },
//   //           location: {
//   //             S: props.location,
//   //           },
//   //         },
//   //       })
//   //     );
//   //   } catch (error) {
//   //     console.error("Error putting item into DynamoDB:", error);
//   //     throw error;
//   //   }
//   // }

//   public async putItem(props: DynamoDBServiceProps): Promise<void> {
//     try {
//       const item: { [key: string]: { S: string } } = {};
//       if (props.id) {
//         item.id = { S: props.id };
//       }
//       if (props.location) {
//         item.location = { S: props.location };
//       }

//       const result = await this.client.send(
//         new PutItemCommand({
//           TableName: this.tableName,
//           Item: item,
//         })
//       );
//       console.log(result);
//     } catch (error) {
//       console.error("Error putting item into DynamoDB:", error);
//       throw error;
//     }
//   }

//   // Add more methods as needed...
// }

// export default DynamoDBService;
