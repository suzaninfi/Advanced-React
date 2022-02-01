## Keystone

Content managment system. Works with GraphQL.

### Config
See `keystone.ts`.

### Creating data types
- Use `isIndexed: true` for fields you're going to search a lot by  (like names or ids).
MongoDB can advise you about that in the performance tab.

### Seed-data
Run
```bash
npm run seed-data
```
Runs script to create mockdata to fill the weshop for testing.

### GraphQL explorer
Click `...` next to user name to open the API Explorer, a playground to try out GraphQL requests.