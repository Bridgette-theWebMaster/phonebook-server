const PhonebookService - {
    getAllContacts(knex) {
        return knex.select(*).from("phonebook_contacts");
    },

    insertContact(knex, newContact) {
        return knex
            .insert(newContact)
            .into("phonebook_contacts")
            .returning("*")
            .then(rows => {
                return rows[0];
            }),
    },

    getById(knex, id){
        return knex.from("phonebook_contacts").select("*").where("id", id).first();
    },

    deleteContact(knex, id) {
        return knex("phonebook_contacts").where({id}).delete()
    };

    updateContact(knew, id, newContactFields) {
        return knex("phonebook_contacts").where({id})update(newContactFields)
    }
}