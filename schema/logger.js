/* jshint indent: 4 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('logger', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		desc: {
			type: DataTypes.STRING(2000),
			allowNull: false
		},
		time: {
			type: DataTypes.TIME,
			allowNull: false
		},
		user_agent: {
			type: DataTypes.STRING,
			allowNull: false
		},
		req_body: {
			type: DataTypes.STRING(500),
			allowNull: false
		},
		typeError: {
			type: DataTypes.STRING(300),
			allowNull: false
		},
		url: {
			type: DataTypes.STRING(300),
			allowNull: false
		}
	}, {
			tableName: 'logger'
		});
};
