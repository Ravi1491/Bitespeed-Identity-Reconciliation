import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';

@Table({
  underscored: true,
})
export class Contact extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @ForeignKey(() => Contact)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  linkedId: number;

  @Column({
    type: DataType.ENUM('primary', 'secondary'),
    allowNull: false,
  })
  linkPrecedence: 'primary' | 'secondary';

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BelongsTo(() => Contact, { as: 'linkedContact' })
  linkedContact: Contact;

  @HasMany(() => Contact, { foreignKey: 'linkedId', as: 'linkedContacts' })
  linkedContacts: Contact[];
}
