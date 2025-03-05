import dataBase from './dataBase';

export const createProductsTable = async () => {

    try {
        let db = await dataBase();
        return await new Promise(async (relove, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`
        CREATE TABLE IF NOT EXISTS products (
                ArtCode TEXT,
                BalanceOnStock TEXT,
                BarCode INTEGER,
                Description TEXT,
                GroupId TEXT,
                HasParty INTEGER,
                Id INETEGER,
                IsPack INETEGER,
                IsPcs INTEGER,
                IsWeight INTEGER,
                MinPrice TEXT,
                Name TEXT,
                PackPrice TEXT,
                PackQuantity TEXT,
                Price TEXT,
                Status INTEGER,
                UnitId INTEGER,
                VatAlgorithm TEXT,
                VatPercentage INTEGER,
                VatType TEXT,
                FastName TEXT
        );
`,
                    [],
                    () => {
                        relove();
                    },
                    (err) => {
                        console.log(err);
                        reject(null)
                    }
                )
            })
        })
    } catch (err) {
        console.log("create table error:", err)
        return null
    }
}

export async function createProduct(item) {
    let data = { ...item };
    let db = await dataBase();

    if (db) {
        try {
            return await new Promise((relove, reject) => {
                db.transaction(tx => {

                    let fast = data.Name;
                    fast = fast.replace("I", "i");
                    fast = fast.replace("ı", "i");

                    fast = fast.replace("Ə", "e");
                    fast = fast.replace("ə", "e");

                    fast = fast.replace("Ü", "u");
                    fast = fast.replace("ü", "u");

                    fast = fast.replace("Ö", "o");
                    fast = fast.replace("ö", "o");

                    fast = fast.replace("Ç", "c");
                    fast = fast.replace("ç", "c");

                    fast = fast.replace("Ş", "s");
                    fast = fast.replace("ş", "s");

                    fast = fast.replace("Ğ", "g");
                    fast = fast.replace("ğ", "g");

                    fast = fast.replace("R", "r");
                    fast = fast.replace("ğ", "g");

                    fast = fast.replace("İ", "i");

                    fast = String(fast).toLowerCase();

                    let totalName = `${fast}`;

                    fast = data.Name;
                    fast = fast.replace("I", "ı");
                    fast = fast.replace("Ə", "ə");
                    fast = fast.replace("Ü", "ü");
                    fast = fast.replace("Ö", "ö");
                    fast = fast.replace("Ç", "ç");
                    fast = fast.replace("Ş", "ş");
                    fast = fast.replace("Ğ", "ğ");
                    fast = fast.replace("İ", "i");
                    totalName += ` ${fast}`;
                    totalName += ` ${data.BarCode}`;

                    tx.executeSql(
                        `INSERT INTO products (
                                ArtCode,BalanceOnStock,BarCode,Description,GroupId,HasParty,Id,IsPack,IsPcs,IsWeight,MinPrice,Name, PackPrice,PackQuantity,Price,Status,UnitId,VatAlgorithm,VatPercentage,VatType,FastName
                            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [
                            data.ArtCode, data.BalanceOnStock, data.BarCode, data.Description, data.GroupId, data.HasParty, data.Id, data.IsPack, data.IsPcs, data.IsWeight, data.MinPrice, data.Name, data.PackPrice, data.PackQuantity, data.Price, data.Status, data.UnitId, data.VatAlgorithm, data.VatPercentage, data.VatType, totalName
                        ],
                        () => {
                            relove(1);

                        },
                        (err) => {
                            reject(0);
                            console.log("product create process: error", err);
                        }
                    );
                });
            });
        } catch (error) {
            return null;
        }
    }
}

export const getProductsTable = async (search) => {
    try {
        let db = await dataBase();
        let productsTable = [];
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM products WHERE FastName LIKE '%${search}%' COLLATE NOCASE LIMIT 0,30;`,
                        [],
                        (tx, results) => {
                            var len = results.rows.length;
                            for (let index = 0; index < len; index++) {
                                productsTable.push(results.rows.item(index))
                            }
                            relove(productsTable);
                        },
                        (err) => {
                            reject(null);
                        }
                    )
                })
            })
        }
    } catch (err) {
        return null
    }

}

// units

export const createUnitsTable = async () => {

    try {
        let db = await dataBase();
        return await new Promise(async (relove, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`
                    CREATE TABLE units (
                        Id INTEGER,
                        Ratio TEXT,
                        Name TEXT,
                        Title TEXT,
                        Price TEXT,
                        LinkId INTEGER
                    );
`,
                    [],
                    () => {
                        relove();
                    },
                    (err) => {
                        console.log(err);
                        reject(null)
                    }
                )
            })
        })
    } catch (err) {
        return null;
    }
}

export async function createUnit(item) {
    let data = { ...item };
    let db = await dataBase();

    if (db) {
        try {
            return await new Promise((relove, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        `INSERT INTO units (Id, Ratio, Name, Title, Price, LinkId) VALUES
                        (?,?,?,?,?,?);`,
                        [
                            data.Id,
                            data.Ratio,
                            data.Name,
                            data.Title,
                            data.Price,
                            Number(data.LinkId)
                        ],
                        () => {
                            relove(1);
                        },
                        (err) => {
                            reject(0);
                            console.log("units create process: error", err);
                        }
                    );
                });
            });
        } catch (error) {
            return null;
        }
    }
}

export const getUnitsTable = async (search) => {
    try {
        let db = await dataBase();
        let productsTable = [];
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM units WHERE LinkId = '${search}' COLLATE NOCASE LIMIT 0,30;`,
                        [],
                        (tx, results) => {
                            var len = results.rows.length;
                            for (let index = 0; index < len; index++) {
                                productsTable.push(results.rows.item(index))
                            }

                            relove(productsTable);
                        },
                        (err) => {
                            reject(null);
                            console.log("get units table error", err)
                        }
                    )
                })
            })
        }
    } catch (err) {
        return null;
    }
}

// Get table return answer

export const deleteProducts = async () => {
    try {
        let db = await dataBase();
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        'DELETE FROM products;',
                        [],
                        (tx, results) => {
                            relove(true);
                        },
                        (err) => {
                            reject(err);
                        }
                    )
                })
            })
        }
    } catch (err) {
        return null;
    }
}

export const deleteUnits = async () => {
    try {
        let db = await dataBase();
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        'DELETE FROM units;',
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

export const deleteUnitItem = async (id) => {
    try {
        let db = await dataBase();
        return await new Promise((relove, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM units WHERE LinkId=${id}`,
                    [],
                    () => {
                        relove(true)
                    },
                    () => {
                        reject(null)
                    }
                )
            })
        })
    } catch (err) {
        return null;
    }
}

export const deleteProductItem = async (id) => {
    try {
        let db = await dataBase();
        return await new Promise((relove, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM products WHERE Id=${id}`,
                    [],
                    () => {
                        relove(true)
                    },
                    () => {
                        reject(null)
                    }
                )
            })
        })
    } catch (err) {
        return null;
    }
}

export const getAllProductsTable = async () => {
    try {
        let db = await dataBase();
        let productsTable = [];
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM products;`,
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
        return null
    }
}

export const getAllUnitsTable = async () => {
    try {
        let db = await dataBase();
        const unitsTable = [];
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM units;`,
                        [],
                        (tx, results) => {
                            var len = results.rows.length;
                            for (let index = 0; index < len; index++) {
                                unitsTable.push(results.rows.item(index))
                            }
                            relove(unitsTable);
                        },
                        (err) => {
                            reject(null);
                            console.log("get units table error", err)
                        }
                    )
                })
            })
        }
    } catch (err) {
        return null;
    }
}

export const getProductId = async (search) => {
    try {
        let db = await dataBase();
        let productsTable = [];
        if (db) {
            return await new Promise((relove, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM products WHERE Id = ${search} COLLATE NOCASE LIMIT 0,30;`,
                        [],
                        (tx, results) => {
                            var len = results.rows.item(0)
                            relove(len);
                        },
                        (err) => {
                            reject(null);
                        }
                    )
                })
            })
        }
    } catch (err) {
        return null
    }

}