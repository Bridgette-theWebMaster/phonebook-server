function makeContactArray() {
  return [
    {
      id: 1,
      user_id: 1,
      name: "jane",
      email: "jane@test.com",
      street: "123 main st.",
      zip: "90210",
      phone: "123-456-7890",
      note: "Lorem ipsum dolor sit amet.",
    },
  ];
}

function makeMaliciousContact() {
  const maliciousContact = {
    id: 911,
    user_id: 911,
    name: "bad",
    email: "bad@test.com",
    street: "123 main st.",
    zip: "90210",
    phone: "123-456-7890",
    note: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };
  const expectedContact = {
    ...maliciousContact,
    name:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    note: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };
  return {
    maliciousContact,
    expectedContact,
  };
}

module.exports = {
  makeContactArray,
  makeMaliciousContact,
};
