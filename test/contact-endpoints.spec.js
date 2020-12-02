const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const {
  makeContactArray,
  makeMaliciousContact,
} = require("./contacts.fixtures.js");
const { makeUsersArray } = require("./users.fixtures.js");

describe("Contacts Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before('cleanup', () => db('phonebook').truncate())

  afterEach('cleanup', () => db('phonebook').truncate())

  describe(`GET /api/contacts`, () => {
    context(`Given no contacts`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/contacts").expect(200, []);
      });
    });

    context(`Given there are contacts in the database`, () => {
      const testContacts = makeContactArray();
      const testUsers = makeUsersArray();

      beforeEach("insert contact", () => {
        return db
          .into("phonebook_contacts")
          .insert(testUsers)
          .then(() => {
            return db.into("phonebook_contacts").insert(testContacts);
          });
      });

      it(`responds with 200 and all of the contacts`, () => {
        return supertest(app).get("/api/contacts").expect(200, testContacts);
      });
    });

    context(`Given an XSS attack contact`, () => {
      const { maliciousContact, expectedContact } = makeMaliciousContact();

      beforeEach("insert malicious article", () => {
        return db.into("phonebook_contacts").insert([maliciousContact]);
      });

      it(`removes XSS attack content`, () => {
        return supertest(app)
          .get(`/api/contacts`)
          .expect(200)
          .expect((res) => {
            expect(res.body[0].name).to.eql(expectedContact.name);
            expect(res.body[0].note).to.eql(expectedContact.note);
          });
      });
    });
  });

  describe(`GET /api/contacts/:contact_id`, () => {
    context(`Given no contacts`, () => {
      it(`responds with 404`, () => {
        const contactId = 987654;
        return supertest(app)
          .get(`/api/contacts/${contactId}`)
          .expect(404, { error: { message: `Contact doesn't exist` } });
      });
    });

    context(`Given there are contacts in the database`, () => {
      const testContacts = makeContactArray();

      beforeEach("insert contacts", () => {
        return db
          .into("phonebook_users")
          .insert(testUsers)
          .then(() => {
            return db.into("phonebook_contacts").insert(testContacts);
          });
      });

      it(`responds with 200 and the contact`, () => {
        const contactId = 1;
        const expectedContact = testContacts[contactId - 1];
        return supertest(app)
          .get(`/api/contacts/${contactId}`)
          .expect(200, expectedContact);
      });
    });

    context(`Given an XSS attack contact`, () => {
      const { maliciousContact, expectedContact } = makeMaliciousContact();

      beforeEach("insert malicious contact", () => {
        return db
          .into("phonebook_users")
          .insert(testUsers)
          .then(() => {
            return db.into("phonebook_contacts").insert([maliciousContact]);
          });
      });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/contacts.${maliciousContact.id}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.name).to.eql(expectedContact.name);
            expect(res.body.note).to.eql(expectedContact.note);
          });
      });
    });
  });

  describe(`POST /api/contact`, () => {
    it(`creates a contact, responding with 201 and the new contact`, () => {
      const newContact = {
        name: "Test",
        phone: "888-888-8888",
        email: "test@test.com",
        street: "123 elm st",
        zip: "12345",
      };
      return supertest(app)
        .post("/api/contact")
        .send(newContact)
        .expect((res) => {
          expect(res.body.name).to.eql(newContact.name);
          expect(res.body.phone).to.eql(newContact.phone);
          expect(res.body.email).to.eql(newContact.email);
          expect(res.body.street).to.eql(newContact.street);
          expect(res.body.zip).to.eql(newContact.zip);
          expect(res.body).to.have.property("id");
          expect(res.headers.location).to.eql(`/api/contacts/${res.body.id}`);
          expect(actual).to.eql(expected);
        })

        .then((res) =>
          supertest(app).get(`/api/contacts/${res.body.id}`).expect(res.body)
        );
    });
  });

  describe(`DELETE /api/contacts/:contact_id`, () => {
    context(`Given no contacts`, () => {
      it(`responds with 404`, () => {
        const contactId = 123456;
        return supertest(app)
          .delete(`/api/contacts/${contactId}`)
          .expect(404, { error: { message: `Contact doesn't exist` } });
      });
    });
    context("Given there are articles in the database", () => {
      const testContacts = makeContactArray();

      beforeEach("insert malicious contact", () => {
        return db
          .into("phonebook_users")
          .insert(testUser)
          .then(() => {
            return db.into("phonebook_contacts").insert([maliciousContact]);
          });
      });

      it(`responds with 204 and removes the contacts`, () => {
        const idToRemove = 1;
        const expectedContacts = testContacts.filter(
          (contact) => contact.id !== idToRemove
        );
        return supertest(app)
          .delete(`/api/contacts/${idToRemove}`)
          .expect(204)
          .then((res) =>
            supertest(app).get(`/api/contact`).expect(expectedContacts)
          );
      });
    });
  });

  describe(`PATCH /api/contacts/:contact_id`, () => {
    context(`Given no contacts`, () => {
      it(`responds with 404`, () => {
        const contactId = 654321;
        return supertest(app)
          .delete(`/api/contacts/${contactId}`)
          .expect(404, { error: { message: `Contact doesn't exist` } });
      });
    });

    context(`Given there are contacts in the database`, () => {
      const testContacts = makeContactArray();

      beforeEach("insert contact", () => {
        return db
          .into("phonebook_users")
          .insert(testUsers)
          .then(() => {
            return db.into("phonebook_contacts").insert(testContacts);
          });
      });

      it(`responds with 204 and updates the contact`, () => {
        const idToUpdate = 1;
        const updatedContact = {
          name: "test1",
          phone: "888-888-8888",
          email: "test1@test.net",
          street: "111 test ln",
          zip: "54321",
        };

        const expectedContact = {
          ...testContacts[idToUpdate - 1],
          ...updatedContact,
        };

        return supertest(app)
          .patch(`/api/contacts/${idToUpdate}`)
          .send(updatedContact)
          .expect(204)
          .then((res) =>
            supertest(app)
              .get(`/api/contacts/${idToUpdate}`)
              .expect(expectedContact)
          );
      });
      it(`responds with 400 when no required field supplied`, () => {
        const idToUpdate = 1;
        return supertest(app)
          .patch(`/api/contacts/${idToUpdate}`)
          .send({ irrelevantField: "bar" })
          .expect(400, {
            error: {
              message: `Request body must contain either 'name', 'email', 'phone', 'street', or 'zip'`,
            },
          });
      });
      it(`responds with 204 when updating only a subset of fields`, () => {
        const idToUpdate = 1;
        const updatedContact = {
          name: "foo",
        };
        const expectedContact = {
          ...testContacts[idToUpdate - 1],
          ...updatedContact,
        };

        return supertest(app)
          .patch(`/api/contacts/${idToUpdate}`)
          .send({
            ...updatedContact,
            fieldToIgnore: "should not be in GET response",
          })
          .expect(204)
          .then((res) =>
            supertest(app)
              .get(`/api/contacts/${idToUpdate}`)
              .expect(expectedContact)
          );
      });
    });
  });
});
