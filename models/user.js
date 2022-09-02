const db = require('../util/database');

module.exports = class User {

    constructor(nev, felhasznalonev, jelszo){
       
        this.nev = nev;
        this.felhasznalonev = felhasznalonev ;
        this.jelszo = jelszo;
    }
    static find(felhasznalonev){
        return db.execute('SELECT * FROM felhasznalo WHERE felhasznalonev = ? ',[felhasznalonev] );
    }
    
    static save(user){
            return db.execute (
                'INSERT INTO felhasznalo (nev,felhasznalonev,jelszo) VALUES (?,?,?)', [user.nev,user.email,user.jelszo] 
            )
    }

};

