
class Shivam_Store {

    constructor(name, remote, onChange) {
		//creating local database
        this.db = new PouchDB(name);
		//creating remote data
		this.db2 = new PouchDB('http://localhost:5984/shivam');
		//creating a remote database
		this.db2.info().then(function (info) {
        console.log(info);
})

        PouchDB.sync(name, `${remote}/${name}`, {
            live: true,
            retry: true
        }).on('change', info => {
            onChange(info);
        });
    }

    getAll() {
        return this.db.allDocs({ include_docs: true })
            .then(db => {
                return db.rows.map(row => {
                    return row.doc;
                });
            });
    }

    get(id) {
        return this.db.get(id);
    }

    save(item) {
        this.add(item);
    }

    add(item) {
		//to do change over here use put 
        //return this.db.put(item);
		
	return this.db.put(item);
    }

    update(item) {
        return this.db.get(item._id)
            .then(updatingItem => {
                Object.assign(updatingItem, item);
                return this.db.put(updatingItem);
            });
    }

    remove(id) {
        return this.db.get(id)
            .then(item => {
                return this.db.remove(item);
            });
    }
}

window.Shivam_Store = Shivam_Store;