import { DataSource } from 'typeorm';

//TODO:
export interface BaseDataSourceOptions {}

export class DataSourceManager {
  public readonly dataSources: DataSource[] = [];
}
