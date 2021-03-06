module.exports = (sequelize, dataTypes) => {

    let alias = 'Users'

    let col = {
            user_id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email:{
                type: dataTypes.STRING,
                notNull: true,
                unique: true

            } , 
            password:{
                type: dataTypes.STRING,
                notNull: true,
                
            },
            name:{
                type: dataTypes.STRING,
                notNull: true,
            },
            img:{
                type: dataTypes.STRING,
            },

    }
    let config = {

        timestamps: false

    }


    const Users = sequelize.define(alias, col, config);
/*
    User.associate = function(models) {
        User.belongsTo(models.Cart, {
            as:"cart",
            foreignKey: "cart_id"
        });
        User.hasMany(models.Orden, {
            as:"orden",
            foreignKey: "orden_id"
        });
    

}*/
return Users;


}





