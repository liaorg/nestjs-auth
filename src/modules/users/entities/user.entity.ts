import { Exclude, Transform } from "class-transformer";
import { randomBytes, scryptSync } from "node:crypto";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn,
    UpdateDateColumn,
} from "typeorm";

// nullable: false 不可以为空。
// unique: true 唯一值, 不允许有重复的name的值出现, 需要注意的是如果当前的表里面已经有重复的name了typeorm会报错, 所以如果设置失败请检查表内容。
// length: 256限制字符的长度, 对应varchar(256)。
// default: '暂无'默认值, 要注意当你手动设置为空字符串时并不会被设置为默认值。
// type: 'enum定义为枚举类型, enum: GoodsStatus 指定枚举值, 当你赋予其非枚举值时会报错。
// type: 'timestamp'定义类型为时间格式, CURRENT_TIMESTAMP默认就是创建时间。
// @CreateDateColumn()这个自动就可以为我们设置值为创建时间。
// @UpdateDateColumn()以后每次更新数据都会自动的更新这个时间值。

// 标记为实体，指定表名
@Entity("users")
export class UserEntity {
    // 输出到 dto 时变换数据格式
    @Transform((id) => id.value.toString())
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    realName: string;

    // 输出到 dto 时排除属性
    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @Column()
    passwordSalt: string;

    @Column()
    mobile: number;

    @Column({ type: "int", default: 3 })
    // 这边的 type default 好像没有用
    // 直接用赋值形式可以设置默认值
    // 参数校验要到 dto 里做
    role = 3;

    @Column({ type: "int", default: 0 })
    userStatus = 0;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async encryptPwd() {
        if (!this.password) return;
        this.passwordSalt = randomBytes(16).toString("hex");
        this.password = scryptSync(this.password, this.passwordSalt, 64).toString("hex");
    }
}
