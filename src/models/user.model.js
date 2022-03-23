const users =(sequelize, type) =>{
    return sequelize.define('users', {
        idUsuarios: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: type.STRING(99),
        password: type.STRING,
        email: type.STRING, 
        createnUsers:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateUsers:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = users
