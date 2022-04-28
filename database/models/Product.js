module.exports = (sequelize, dataTypes) => {

    let alias = 'Product'

    let col = {
            products_id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name:{
                type: dataTypes.STRING,
                notNull: true,
                unique: true

            } , 
            price:{
                type: dataTypes.STRING,
                notNull: true,
                
            },
            discount:{
                type: dataTypes.STRING,
                notNull: true,
            },
            img:{
                type: dataTypes.TEXT
            },
            description:{
                type: dataTypes.TEXT
            },
            lead_time:{
                type: dataTypes.TEXT
            },
            size_id:{
                type: dataTypes.TEXT
            },
            color_id:{
                type: dataTypes.TEXT
            },
            category_id:{
                type: dataTypes.TEXT
            }

    }
    let confi = {

        timestamps: false

    }


    const Product = sequelize.define(alias, col, confi);

    return Product;
}

Product.associate = function(models) {
    Product.belongsTo(models.User, {
        as:"user",
        foreingKey: "user_id"
    });
    Product.belongsTo(models.Category, {
        as:"category",
        foreingKey: "category_id"
    });
    Product.belongsTo(models.Color,{
        as:"color",
        foreingKey: "color_id"

    });
    Product.belongsTo(models.Size,{
        as:"size",
        foreingKey: "size_id"

    });
}

