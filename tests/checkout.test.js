const test = require('node:test');
const assert = require('node:assert/strict');

process.env.NODE_ENV = 'test';

const server = require('../server/index');
const { validateOrder, getDeliveryFee } = server._test;

function validOrder(overrides = {}) {
  return {
    prenom: 'Oualid',
    nom: 'Karmoun',
    telephone: '+212600000000',
    ville: 'Oujda',
    adresse: '10 Rue Exemple',
    items: [
      {
        productId: 'P001',
        fragrance: 'Oud',
        qty: 2,
        // These values must never be trusted by the backend.
        price: 1,
        name: 'Fake client-side name'
      }
    ],
    ...overrides
  };
}

test('checkout ignores client-side product names and prices', () => {
  const order = validateOrder(validOrder());
  assert.equal(order.items.length, 1);
  assert.deepEqual(order.items[0], {
    productId: 'P001',
    fragrance: 'Oud',
    qty: 2
  });
  assert.equal('subtotal' in order, false);
  assert.equal('total' in order, false);
});

test('checkout keeps a supplied idempotency order number', () => {
  const order = validateOrder(validOrder({ orderNum: 'FLB-TEST-IDEMPOTENT-001' }));
  assert.equal(order.orderNum, 'FLB-TEST-IDEMPOTENT-001');
});

test('checkout generates a unique order number when none is supplied', () => {
  const first = validateOrder(validOrder());
  const second = validateOrder(validOrder());
  assert.match(first.orderNum, /^FLB-/);
  assert.notEqual(first.orderNum, second.orderNum);
});

test('checkout rejects an invalid phone number', () => {
  assert.throws(
    () => validateOrder(validOrder({ telephone: '12' })),
    /Telephone invalide/
  );
});

test('checkout rejects a missing delivery address', () => {
  assert.throws(
    () => validateOrder(validOrder({ adresse: '' })),
    /Adresse is required/
  );
});

test('shipping is calculated from canonical subtotal and city', () => {
  assert.equal(getDeliveryFee('Oujda', 200), 15);
  assert.equal(getDeliveryFee('Casablanca', 200), 30);
  assert.equal(getDeliveryFee('Casablanca', 500), 0);
});
