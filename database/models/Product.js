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

    Product.associate = function(models) {
        Product.belongsTo(models.User, {
            as:"user",
            foreignKey: "user_id"
        });
        Product.belongsTo(models.Category, {
            as:"category",
            foreignKey: "category_id"
        });
        Product.belongsTo(models.Color,{
            as:"color",
            foreignKey: "color_id"
    
        });
        Product.belongsTo(models.Size,{
            as:"size",
            foreignKey: "size_id"
    
        });
    }

    return Product;
}


