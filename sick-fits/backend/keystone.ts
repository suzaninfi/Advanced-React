import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long should user stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email', // what they login with
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'], // what you need to put in to create a very first item
    // todo: add in initial roles here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // allow for running seed-data when db connects
      // this script adds mock data to the webshop for testing etc
      async onConnect(keystone) {
        console.log('Connected to the database');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
      // TODO: add data seeding here
    },
    lists: createSchema({
      // schema items go in here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // Show the UI only for people who pass this:
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // TODO: add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL query, this ends up in the session
      User: 'id name email',
    }),
  })
);
