const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class User extends Model {
	async number_of_notes() {
		return (await this.getNotes()).length;
	}
	static async with_notes(limit) {
		return await User.findAll({
			attributes: {
				include: [
					[sequelize.fn("COUNT", sequelize.col("notes.id")), "note_count"],
				],
			},
			include: [
				{
					model: Note,
					attributes: [],
				},
			],
			group: ["user.id"],
			having: sequelize.literal(`COUNT(notes.id) > ${limit}`),
		});
	}
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		admin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		disabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: "user",
		defaultScope: {
			where: {
				disabled: false,
			},
		},
		scopes: {
			admin: {
				where: {
					admin: true,
				},
			},
			disabled: {
				where: {
					disabled: true,
				},
			},
			name(value) {
				return {
					where: {
						name: {
							[Op.iLikes]: value,
						},
					},
				};
			},
		},
	},
);

module.exports = User;
