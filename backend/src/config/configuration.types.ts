export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface AesConfig {
  key: Buffer;
  expiration: number;
}

export interface TinifyConfig {
  apiKey: string;
}
