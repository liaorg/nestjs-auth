/**
 * File: sqlite.js.
 * Author: W A P.
 * Email: 610585613@qq.com.
 * Datetime: 2018/07/24.
 */

import { closeSync, existsSync, openSync } from "fs";
import { verbose, Database } from "sqlite3";

export class SqliteDB {
    private db: Database;
    constructor(file: string) {
        if (!existsSync(file)) {
            // console.log("Creating db file!");
            let fd: number;
            try {
                fd = openSync(file, "w");
            } finally {
                if (fd !== undefined) closeSync(fd);
            }
        }
        const sqlite3 = verbose();
        this.db = new sqlite3.Database(file);
    }
    getDb() {
        return this.db;
    }
    printErrorInfo(err: Error) {
        throw new Error(err.message);
    }
    async createTable(sql: string) {
        this.db.serialize(() => {
            this.db.run(sql, (err) => {
                if (null !== err) {
                    this.printErrorInfo(err);
                }
            });
        });
    }
    // tilesData format; [[level, column, row, content], [level, column, row, content]]
    async insertData(sql: string, data: any[]) {
        this.db.serialize(() => {
            const stmt = this.db.prepare(sql);
            for (let i = 0; i < data.length; ++i) {
                stmt.run(data[i]);
            }
            stmt.finalize();
        });
    }
    async queryData(sql: string, callback: (arg0: any[]) => void) {
        this.db.all(sql, (err, data) => {
            if (null !== err) {
                this.printErrorInfo(err);
            }
            if (typeof callback === "function") {
                callback(data);
            }
        });
    }
    async executeSql(sql: string) {
        this.db.run(sql, (err) => {
            if (null !== err) {
                this.printErrorInfo(err);
            }
        });
    }
    async close() {
        this.db.close();
    }
}
