const { DataTypes } = require('sequelize');
const db = require('../database');

module.exports = (sequelize) => {
  if (!sequelize) sequelize = db.sequelize();

  const attributes = {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id'
    },
    m_class_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'm_class_id',
      references: {
        key: 'id',
        model: 'm_class_model'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'name'
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'status'
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'created_date'
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'created_by'
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_date'
    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_by'
    }
  };
  const options = {
    timestamps: false,
    tableName: 'm_subject',
    comment: '',
    indexes: [
      {
        name: 'm_class_id',
        unique: false,
        type: 'BTREE',
        fields: ['m_class_id']
      }
    ]
  };
  const MSubjectModel = sequelize.define(
    'm_subject_model',
    attributes,
    options
  );
  return MSubjectModel;
};
