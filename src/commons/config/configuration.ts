
export default () => ({
    database: {
        //Passar isso aqui para process.env
        type: 'postgres',
        host: 'localhost',
        port:  5432,
        username: 'postgres',
        password: 'postgres',
        database: 'task-management',
        autoLoadEntities: true,
        synchronize: true
    }
})