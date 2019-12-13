class Employee {
    constructor(name, id, email, role="Employee") {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    getName() {
        console.log(`Name: ${this.name}`);
        return this.name
        
    }

    getId() {
        console.log(`ID: ${this.id}`);
        return this.id
    }

    getEmail() {
        console.log();
        return this.email
    }

    getRole() {
        // console.log(`Title: ${this.title}`);
        return this.role
    }
}

module.exports = Employee