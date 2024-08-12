import { faker } from '@faker-js/faker';
import { createServer, Factory, Model, Response } from 'miragejs';

type User = {
  name: string;
  email: string;
  password: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        password() {
          return faker.internet.password();
        },
        createdAt() {
          return faker.date.recent({ days: 10 });
        },
      }),
    },

    seeds(server) {
      // Create a known user
      server.create('user', {
        name: 'John Doe',
        email: 'test@test.com',
        password: '123456',
        created_at: new Date().toISOString(),
      });
    
      // Create other random users
      server.createList('user', 199);
    
      // Log all users to the console
      const allUsers = server.db.users;
      console.log('allUsers', allUsers);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function (schema, request) {

        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;
        console.log('TOTAL',total);

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user')).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(200, { 'x-total-count': String(total) }, { users });
      });

      this.post('/users');

      this.namespace = '';
      this.passthrough();
    },
  });
  return server;
}
