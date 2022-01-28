/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    port: number
    mongoUri: string
  }
  export const config: Config
  export type Config = IConfig
}
