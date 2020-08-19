let db;
// Creates a new database(db) request for a "budget" database.
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
  // Creates object store called "pending" and sets autoIncrement to true.
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  // Checks if app is online before reading from database(db).
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log("Woops! " + event.target.errorCode);
};

function saveRecord(record) {
  // Create a transaction on the pending db with readwrite access.
  const transaction = db.transaction(["pending"], "readwrite");

  // Access pending object store.
  const store = transaction.objectStore("pending");

  // Adds record to store with add method.
  store.add(record);
}

function checkDatabase() {
  // Opens a transaction on pending database(db).
  const transaction = db.transaction(["pending"], "readwrite");
  // Accesses pending object store.
  const store = transaction.objectStore("pending");
  // Gets all records from store and sets to a variable.
  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          // If successful, open a transaction on pending database(db).
          const transaction = db.transaction(["pending"], "readwrite");

          // Accesses pending object store.
          const store = transaction.objectStore("pending");

          // Clears all items in store.
          store.clear();
        });
    }
  };
}

// Listens for app coming back online.
window.addEventListener("online", checkDatabase);
