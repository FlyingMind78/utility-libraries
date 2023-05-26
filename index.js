/**
 * Author: Maibam Maneesana Singh
 * Github account: https://github.com/FlyingMind78
 * This file provide 5 utility function for performing CRUD operations on IndexDB in the web browser.
 * To create a new database in indexDB => use window.indexDB.open(NAME_OF_YOUR_DATABASE,VERSION_NUMBER)
 * IndexDB key terms quick reference : https://web.dev/indexeddb/#terms
 *
 */

if (!"indexDB" in window) {
  console.log("IndexDB is not supported on this browser");
} else {
  console.log("IndexDB is ready to use");
}

//  example - creating an indexDB requestObject
const request = window.indexedDB.open("dummyDB", 1);

// insert one item to indexDB objectStore
function insertOne(databaseRequestObj, data, nameOfObjectStore) {
  if (!Object.keys(data).includes("id")) {
    data["id"] = crypto.randomUUID();
  }

  databaseRequestObj.onerror = (event) => {
    console.log("Something went wrong while trying to connect the database");
  };
  databaseRequestObj.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(nameOfObjectStore)) {
      const OS = db.createObjectStore(nameOfObjectStore, {
        autoIncrement: true,
      });
      OS.createIndex(nameOfObjectStore + "Index", "id");
    }
  };

  databaseRequestObj.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction([nameOfObjectStore], "readwrite");
    const store = transaction.objectStore(nameOfObjectStore);
    const request = store.add(data, data.id);
    request.onerror = (event) => {
      console.error("Something went wrong while adding item");
    };

    request.onsuccess = (event) => {
      console.log("Data added successfully");
      db.close();
    };
  };
}

// read all data items from one indexDB objectStore
function readAll(databaseRequestObj, nameOfObjectStore) {
  databaseRequestObj.onerror = (event) => {
    console.log("Something went wrong while trying to connect the database");
  };
  databaseRequestObj.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(nameOfObjectStore)) {
      const OS = db.createObjectStore(nameOfObjectStore, {
        autoIncrement: true,
      });
      OS.createIndex(nameOfObjectStore + "Index", "id");
    }
  };

  databaseRequestObj.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction([nameOfObjectStore], "readonly");
    const store = transaction.objectStore(nameOfObjectStore);
    const request = store.getAll();
    request.onerror = (event) => {
      console.error("Something went wrong while getting data");
    };

    request.onsuccess = (event) => {
      console.log("Read all data successfully", event.target.result);
      db.close();
    };
  };
}
// read one data item from one indexDB objectStore
function readOne(databaseRequestObj, nameOfObjectStore, primaryKey) {
  databaseRequestObj.onerror = (event) => {
    console.log("Something went wrong while trying to connect the database");
  };
  databaseRequestObj.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(nameOfObjectStore)) {
      const OS = db.createObjectStore(nameOfObjectStore, {
        autoIncrement: true,
      });
      OS.createIndex(nameOfObjectStore + "Index", "id");
    }
  };

  databaseRequestObj.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction([nameOfObjectStore], "readonly");
    const store = transaction.objectStore(nameOfObjectStore);
    const request = store.get(primaryKey);
    request.onerror = (event) => {
      console.error("Something went wrong while getting data");
    };

    request.onsuccess = (event) => {
      console.log("Read one item from database", event.target.result);
      db.close();
    };
  };
}
// update one data item from one indexDB objectStore
function updateOne(databaseRequestObj, nameOfObjectStore, data, primaryKey) {
  if (!Object.keys(data).includes("id")) {
    data["id"] = primaryKey;
  }

  databaseRequestObj.onerror = (event) => {
    console.log("Something went wrong while trying to connect the database");
  };
  databaseRequestObj.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(nameOfObjectStore)) {
      const OS = db.createObjectStore(nameOfObjectStore, {
        autoIncrement: true,
      });
      OS.createIndex(nameOfObjectStore + "Index", "id");
    }
  };

  databaseRequestObj.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction([nameOfObjectStore], "readwrite");
    const store = transaction.objectStore(nameOfObjectStore);
    const request = store.put(data, primaryKey);
    request.onerror = (event) => {
      console.error("Something went wrong while updating item");
    };

    request.onsuccess = (event) => {
      console.log("updated data successfully");
      db.close();
    };
  };
}
//  delete one data item from one indexDB objectStore
function deleteOne(databaseRequestObj, nameOfObjectStore, primaryKey) {
  databaseRequestObj.onerror = (event) => {
    console.log("Something went wrong while trying to connect the database");
  };
  databaseRequestObj.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(nameOfObjectStore)) {
      const OS = db.createObjectStore(nameOfObjectStore, {
        autoIncrement: true,
      });
      OS.createIndex(nameOfObjectStore + "Index", "id");
    }
  };

  databaseRequestObj.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction([nameOfObjectStore], "readwrite");
    const store = transaction.objectStore(nameOfObjectStore);
    const request = store.delete(primaryKey);
    request.onerror = (event) => {
      console.error("Something went wrong while deleting data");
    };

    request.onsuccess = (event) => {
      console.log("Deleted one item from database");
      db.close();
    };
  };
}

export { insertOne, readAll, readOne, updateOne, deleteOne };
