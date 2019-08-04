/* jshint indent: 4 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_name: {
			type: DataTypes.CHAR(64),
			allowNull: false
		},
		password: {
			type: DataTypes.CHAR(15),
			allowNull: false
		},
		mobile: {
			type: DataTypes.CHAR(11),
			allowNull: true
		}
	}, {
			tableName: 'user'
		});
};
