import dataBase from "./dataBase";

export const createSalesTable = async () => {
    try {
        let db = await dataBase();
        return await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`
                    CREATE TABLE IF NOT EXISTS sales (
                        Id TEXT PRIMARY KEY,
                        ShiftId TEXT,
                        OwnerId TEXT,
                        Modify TEXT,
                        Name TEXT,
                        Moment TEXT,
                        CustomerId TEXT,
                        EmployeeId TEXT,
                        Amount INTEGER,
                        Bank INTEGER,
                        UseBonus INTEGER,
                        Credit INTEGER,
                        AllSum INTEGER,
                        MoneyBack INTEGER,
                        Discount INTEGER,
                        Description TEXT,
                        Items TEXT
                    );
                `,
                    [],
                    async () => {
                        resolve(1);
                    },
                    (err) => {
                        console.log(err);
                        reject(0);
                    });
            });
        });
    } catch (err) {
        console.log("create sales table error:", err);
        return null;
    }
}
export const createSale = async (item) => {
    let data = { ...item };
    let db = await dataBase();

    if (db) {
        try {
            return await new Promise((resolve, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        `INSERT INTO sales (
                            Id, ShiftId, OwnerId, Modify, Name, Moment, CustomerId, EmployeeId, Amount, Bank, UseBonus, Credit, AllSum, MoneyBack, Discount, Description, Items
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);`,
                        [
                            data.Id, data.ShiftId, data.OwnerId,
                            data.Modify, data.Name,
                            data.Moment, data.CustomerId,
                            data.EmployeeId, data.Amount, data.Bank,
                            data.UseBonus, data.Credit, data.AllSum,
                            data.MoneyBack, data.Discount, data.Description,
                            JSON.stringify(data.Items)
                        ],
                        async () => {
                            resolve(1);
                        },
                        (err) => {
                            reject(0);
                            console.log("sale create process: error", err);
                        }
                    );
                });
            });
        } catch (error) {
            console.log("createSale error:", error);
            return null;
        }
    }
}
export const getAllSalesTable = async () => {
    try {
        let db = await dataBase();
        let salesTable = [];
        if (db) {
            return await new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM sales;`,
                        [],
                        (tx, results) => {
                            let len = results.rows.length;
                            for (let i = 0; i < len; i++) {
                                let row = results.rows.item(i);
                                row.Items = JSON.parse(row.Items);
                                salesTable.push(row);
                            }
                            resolve(salesTable);
                        },  
                        (err) => {
                            reject(null);
                            console.log("getAllSalesTable error:", err);
                        }
                    );
                });
            });
        }
    } catch (err) {
        console.log("getAllSalesTable error:", err);
        return null;
    }
}
export const deleteSalesTable = async () => {
    try {
        let db = await dataBase();
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        'DELETE FROM sales;',
                        [],
                        (tx, results) => {
                            relove(true);
                        },
                        (err) => {
                            reject(null);
                        }
                    )
                })
            })
        }
    } catch (err) {
        return null;
    }
}
export const deleteSaleItem = async (id) => {
    let db = await dataBase();

    if (db) {
        try {
            return await new Promise((resolve, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        `DELETE FROM sales WHERE Id = ?;`,
                        [id],
                        () => {
                            resolve(1);
                        },
                        (err) => {
                            reject(null);
                            console.log(err)
                        }
                    );
                });
            });
        } catch (error) {
            console.log("deleteSale error:", error);
            return null;
        }
    }
}