const env = process.env.NODE_ENV;
const common = {
  port: 8880,
  cloudinary: {
    cloud_name: 'cloudinary_name',
    api_key: 'XXXXXXXXXXXXXXX',
    api_secret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX'
  }
};
const config = {
  develop: {
    mongodb: {
      host: '127.0.0.1',
      database: 'local_database_name'
    },
    secret: 'some_secret'
  },
  production: {
    mongodb: {
      host1: 'remote_database_host1',
      host2: 'remote_database_host2',
      database: 'remote_database_name',
      user: 'remote_database_user',
      password: 'remote_database_password',
      port: 'remote_database_port'
    },
    secret: 'remote_database_secret'
  },
  test: {
    mongodb: {
      host: '127.0.0.1',
      database: 'local_database_name'
    }
  },
  deploy: {
    remote: {
      name: 'heroku project name',
      url: 'heroku git repository url address',
      branch: 'master',
      website: 'heroku website url address'
    }
  }
};
export default Object.assign(common, config[env]);
