const WalletModel = (sequelize, Sequelize) => {
    const Wallet = sequelize.define('wallets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    });
    return Wallet;
  };
  
  export default WalletModel
  