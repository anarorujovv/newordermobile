import dataBase from "./dataBase";

export const createDemandsTable = async () => {
    try {
        let db = await dataBase();
        return await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`
                CREATE TABLE IF NOT EXISTS demands (
                    AllSum TEXT,
                    Amount INTEGER,
                    Bank INTEGER,
                    Credit TEXT,
                    CustomerId TEXT,
                    Discount INTEGER,
                    EmployeeId INTEGER,
                    ExternalDocumentId TEXT,
                    ExternalDocumentNumber TEXT,
                    ExternalShiftDocumentNumber TEXT,
                    ExternalShortDocumentId TEXT,
                    Id TEXT,
                    Modify TEXT,
                    Moment TEXT,
                    MoneyBack TEXT,
                    Name TEXT,
                    OwnerId TEXT,
                    RegisterId TEXT,
                    SalePointId TEXT,
                    ShiftId TEXT,
                    UseBonus INTEGER
                );`,
                    [],
                    async () => {
                        resolve(1);
                    },
                    (err) => {
                        console.log(err);
                        reject(null);
                    }
                )
            })
        });
    } catch (err) {
        console.log("create table error:", err);
        return null;
    }
}

export async function createDemand(item) {
    let data = { ...item };
    let db = await dataBase();

    if (db) {
        try {
            return await new Promise((resolve, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        `
                        INSERT INTO demands (
                            AllSum, Amount, Bank, Credit, CustomerId, Discount, EmployeeId, ExternalDocumentId, ExternalDocumentNumber, ExternalShiftDocumentNumber, ExternalShortDocumentId, Id, Modify, Moment, MoneyBack, Name, OwnerId, RegisterId, SalePointId, ShiftId, UseBonus
                        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
                        `,
                        [
                            data.AllSum, data.Amount, data.Bank, data.Credit, data.CustomerId, data.Discount, data.EmployeeId, data.ExternalDocumentId, data.ExternalDocumentNumber, data.ExternalShiftDocumentNumber, data.ExternalShortDocumentId, data.Id, data.Modify, data.Moment, data.MoneyBack, data.Name, data.OwnerId, data.RegisterId, data.SalePointId, data.ShiftId, data.UseBonus
                        ],
                        async () => {
                            resolve(1);
                        },
                        (err) => {
                            reject(0);
                            console.log(err);
                        }
                    );
                });
            });
        } catch (err) {
            return null;
        }
    }
}


export const deleteDemands = async () => {
    try {
        let db = await dataBase();
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        'DELETE FROM demands;',
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
        console.log(err);
        return null;
    }
}

export const getAllDemands = async () => {
    try {
        let db = await dataBase();
        let demandsTable = []
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM demands LIMIT 0,50`,
                        [],
                        async(tx, results) => {
                            let len = results.rows.length;
                            for (let i = 0; i < len; i++) {
                                let row = results.rows.item(i);
                                const result = await getDemandLinkId(row.Id);
                                if (result != null || result[0]) {
                                    row.Items = result
                                } else {
                                    row.Items = [];
                                }
                                demandsTable.push(row);
                            }
                            relove(demandsTable);
                        },
                        () => {
                            reject(null)
                        },
                    )
                })
            })
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export const createDemandItemsTable = async () => {
    try {
        let db = await dataBase();
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        `
                    CREATE TABLE IF NOT EXISTS demands_item (
                    BasicPrice INTEGER,
                    Party INTEGER,
                    Price INTEGER,
                    PriceExclVat INTEGER,
                    ProductId INTEGER,
                    Quantity INTEGER,
                    Ratio TEXT,
                    UnitId INTEGER,
                    VatPercentage INTEGER,
                    LinkId TEXT
                    );
                `,
                        [],
                        () => {
                            console.log("item table is success create prosess")
                            relove(1)
                        },
                        (err) => {
                            console.log(err);
                            reject(null)
                        }
                    )
                })
            })
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createDemandItems = async (item, id) => {
    try {
        let element = { ...item };
        let db = await dataBase();
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        `INSERT INTO demands_item (
                            BasicPrice,Party,Price,PriceExclVat,ProductId,Quantity,Ratio,UnitId,VatPercentage,LinkId
                        ) VALUES (?,?,?,?,?,?,?,?,?,?);`,
                        [element.BasicPrice, element.Party, element.Price, element.PriceExclVat, element.ProductId, element.Quantity, element.Ratio, element.UnitId, element.VatPercentage, id],
                        () => {
                            relove(1)
                        },
                        (err) => {
                            console.log(err);
                            reject(null)
                        }
                    )
                })
            })
        }
    } catch (err) {
        console.log(err)
        return null;
    }
}

export const demandItemsSearch = async (txt) => {
    try {
        const db = await dataBase();
        let demandsTable = [];
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        `SELECT * FROM demands WHERE Id IN (SELECT LinkId FROM demands_item WHERE ProductId IN (SELECT Id FROM products WHERE Name LIKE '%${txt}%'))`,
                        [],
                        async (tx, results) => {
                            let len = results.rows.length;
                            for (let i = 0; i < len; i++) {
                                let row = results.rows.item(i);
                                const result = await getDemandLinkId(row.Id);
                                if (result != null || result[0]) {
                                    row.Items = result
                                } else {
                                    row.Items = [];
                                }
                                demandsTable.push(row);
                            }
                            relove(demandsTable);
                        },
                        (err) => {
                            console.log(err);
                            reject(null);
                        }
                    )
                })
            })
        }
    } catch (err) {
        console.log(err)
        return null;
    }
}


export const deleteDemandItems = async () => {
    try {
        let db = await dataBase();
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        'DELETE FROM demands_item;',
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
        console.log(err);
        return null;
    }
}


export const getAllDemandsItem = async () => {
    try {
        let db = await dataBase();
        let demandsTable = []
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM demands_item;`,
                        [],
                        (tx, results) => {
                            let len = results.rows.length;
                            for (let i = 0; i < len; i++) {
                                let row = results.rows.item(i);
                                demandsTable.push(row);
                            }
                            relove(demandsTable);
                        },
                        () => {
                            reject(null)
                        },
                    )
                })
            })
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export const getDemandLinkId = async (id) => {
    try {
        let db = await dataBase();
        let demandsTable = []
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM demands_item WHERE LinkId LIKE '%${id}%';`,
                        [],
                        (tx, results) => {
                            let len = results.rows.length;
                            for (let i = 0; i < len; i++) {
                                let row = results.rows.item(i);
                                demandsTable.push(row);
                            }
                            relove(demandsTable);
                        },
                        () => {
                            reject(null)
                        },
                    )
                })
            })
        }
    } catch (err) {
        console.log(err)
        return null
    }
}