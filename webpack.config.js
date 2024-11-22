import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webpackConfig = {
  mode: 'development',
  entry: './src/server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
  externals: {
    express: 'express',
  },
  resolve: {
    fallback: {
      "fs": false,
      "url": false,
      "path": false,
      "http": false,
      "buffer": false,
      "stream": false,
      "util": false,
      "mongodb-client-encryption": false ,
      "aws4": false,
      "socks": false ,
      "snappy": false,
      "gcp-metadata": false ,
      "@aws-sdk/credential-providers": false,
      "@mongodb-js/zstd": false,
      "kerberos": false 
    } 
  },
};

export default webpackConfig;
