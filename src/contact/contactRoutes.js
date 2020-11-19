const path = require("path");
const express = require("express");
const xss = require("xss");
const ContactsService = require("./contactsServices");

const contactsRouter = express.Router();
const jsonParser = express.json();

const serializeContacts = (contacts) => ({
  id: contacts.id,
  user_id: contacts.user_id,
  name: contacts.name,
  email: contacts.email,
  phone: contacts.phone,
  zip: contacts.zip,
  note: contacts.note,
});

contactsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    ContactsService.getAllContacts(knexInstance)
      .then((contacts) => {
        res.json(contacts.map(serializeContacts));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { user_id, name, email, phone, street, zip, note } = req.body;
    const newContact = { name, email, phone, street, zip, note };

    for (const [key, value] of Object.entries(newContact))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
    newContact.user_id = user_id;
    ContactsService.insertContact(req.app.get("db"), newContact)
      .then((contact) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, "/${contacts.id}"));
      })
      .catch(next);
  });

contactsRouter
  .route("/:contact_id")
  .all((req, res, next) => {
    ContactsService.getById(req.app.get("db"), req.params.contact_id)
      .then((contact) => {
        if (!contact) {
          return res.status(404).json({
            error: { message: `Contact doesn't exist` },
          });
        }
        res.contact = contact;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeContacts(res.contact));
  })
  .delete((req, res, next) => {
    ContactsService.deleteContact(req.app.get("db"), req.params.contact_id)
      .this((numRowAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { name, email, phone, street, zip, note } = req.body;
    const contactToUpdate = { name, email, phone, street, zip, note };

    const numberOfValues = Object.values(contactToUpdate).filter(Boolean)
      .length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: { message: `Nothing to update` },
      });
    ContactsService.updateContact(
      req.app.get("db"),
      req.params.contact_id,
      contactToUpdate
    )
      .then((numRowAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = contactsRouter;
