import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class initTables1653935227276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        const userTable = new Table({
            name: 'user',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: `uuid_generate_v4()` },
                { name: 'name', type: 'VARCHAR', length: '50' },
                { name: 'role', type: 'VARCHAR', length: '20' },
                { name: 'created_at', type: 'timestamp', default: 'now()', isNullable: false },
                { name: 'updated_at', type: 'timestamp', default: 'now()', onUpdate: 'now()', isNullable: false },
                { name: 'deleted_at', type: 'timestamp', isNullable: true }
            ]
        });

        await queryRunner.createTable(userTable);

        await queryRunner.query(`INSERT INTO "user" ("id","name", "role") VALUES ('8f12b53b-2b8d-421b-98c8-18cc7a7ffd3a', 'Damian Alvez', 'operator')`)
        await queryRunner.query(`INSERT INTO "user" ("id","name", "role") VALUES ('505ea605-5203-4bf5-981d-ab0fad8358b0', 'Josh Dun', 'operator')`)
        await queryRunner.query(`INSERT INTO "user" ("id","name", "role") VALUES ('873fdfa4-8bae-477d-8775-14cef665900f', 'Roberto Musso', 'operator')`)

        const dinerTable = new Table({
            name: 'diner',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: `uuid_generate_v4()` },
                { name: 'name', type: 'VARCHAR', length: '100' },
                { name: 'no_persons', type: 'INT' },
                { name: 'created_at', type: 'timestamp', default: 'now()', isNullable: false },
                { name: 'updated_at', type: 'timestamp', default: 'now()', onUpdate: 'now()', isNullable: false },
                { name: 'deleted_at', type: 'timestamp', isNullable: true }
            ]
        });

        await queryRunner.createTable(dinerTable);

        const productTable = new Table({
            name: 'product',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: `uuid_generate_v4()` },
                { name: 'name', type: 'VARCHAR', length: '255' },
                { name: 'unit_price', type: 'DECIMAL' },
                { name: 'quantity', type: 'int'},
                { name: 'created_at', type: 'timestamp', default: 'now()', isNullable: false },
                { name: 'updated_at', type: 'timestamp', default: 'now()', onUpdate: 'now()', isNullable: false },
                { name: 'deleted_at', type: 'timestamp', isNullable: true }
            ]
        });

        await queryRunner.createTable(productTable);

        await queryRunner.query(`INSERT INTO "product" ("id", "name", "unit_price", "quantity") VALUES ('a6173bb1-c114-4001-84a5-1d8880a201b9','Hamburgesa ', '50', 100)`)
        await queryRunner.query(`INSERT INTO "product" ("id", "name", "unit_price", "quantity") VALUES ('e9abc3a7-c55a-4ff0-89a1-8b070e17424f','Limonada ', '20', 100)`)
        await queryRunner.query(`INSERT INTO "product" ("id", "name", "unit_price", "quantity") VALUES ('35c10319-f5d1-43d0-ac27-37b8a2518475','Lasagna ', '100', 100)`)
        await queryRunner.query(`INSERT INTO "product" ("id", "name", "unit_price", "quantity") VALUES ('1582dd83-315a-4c45-9c45-ca892c225639','Naranjada', '100', 100)`)

        const orderTable = new Table({
            name: 'order',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: `uuid_generate_v4()` },
                { name: 'order_date', type: 'DATE' },
                { name: 'user_id', type: 'uuid' },
                { name: 'diner_id', type: 'uuid' },
                { name: 'created_at', type: 'timestamp', default: 'now()', isNullable: false },
                { name: 'updated_at', type: 'timestamp', default: 'now()', onUpdate: 'now()', isNullable: false },
                { name: 'deleted_at', type: 'timestamp', isNullable: true }
            ]
        })

        await queryRunner.createTable(orderTable)

        await queryRunner.createForeignKeys('order',
            [
                new TableForeignKey({
                    columnNames: ['user_id'], referencedColumnNames: ['id'], referencedTableName: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE'
                }),
                new TableForeignKey({
                    columnNames: ['diner_id'], referencedColumnNames: ['id'], referencedTableName: 'diner', onDelete: 'CASCADE', onUpdate: 'CASCADE'
                })
            ]);


        const orderProductTable = new Table({
            name: 'order_product',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: `uuid_generate_v4()` },
                { name: 'order_id', type: 'uuid' },
                { name: 'product_id', type: 'uuid' },
                { name: 'quantity', type: 'int' },
                { name: 'total', type: 'decimal' },
                { name: 'created_at', type: 'timestamp', default: 'now()', isNullable: false },
                { name: 'updated_at', type: 'timestamp', default: 'now()', onUpdate: 'now()', isNullable: false },
                { name: 'deleted_at', type: 'timestamp', isNullable: true }

            ]
        });

        await queryRunner.createTable(orderProductTable);

        await queryRunner.createForeignKeys('order_product',
            [
                new TableForeignKey(
                    { columnNames: ['order_id'], referencedColumnNames: ['id'], referencedTableName: 'order', onDelete: 'CASCADE', onUpdate: 'CASCADE' }
                ),
                new TableForeignKey(
                    { columnNames: ['product_id'], referencedColumnNames: ['id'], referencedTableName: 'product', onDelete: 'CASCADE', onUpdate: 'CASCADE' }
                )
            ])



    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order');
        await queryRunner.dropTable('product');
        await queryRunner.dropTable('diner');
        await queryRunner.dropTable('user');
    }

}
