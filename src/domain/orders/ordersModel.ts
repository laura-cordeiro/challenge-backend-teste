import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../../infrastructure/database';
import OrdersProductsModel from '../ordersProducts/ordersProductsModel';
import PaymentsModel from '../payments/paymentsModel';
import { Order } from './orderEntity';

class OrdersModel extends Model<Order> {}

OrdersModel.init(
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      allowNull: false,
      defaultValue: uuidv4(),
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
    sequelize,
  },
);

OrdersModel.hasMany(OrdersProductsModel, {
  foreignKey: 'orderId',
  sourceKey: 'id',
  as: 'ordersProducts',
});

OrdersModel.hasMany(PaymentsModel, {
  foreignKey: 'orderId',
  sourceKey: 'id',
  as: 'payments',
});

export default OrdersModel;
