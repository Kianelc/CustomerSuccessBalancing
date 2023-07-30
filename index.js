const customerSuccessBalancing = require('./src/customer-success-balancing.js');

// Exemplo de uso da função
const customerSuccess = [
    { id: 1, score: 60 },
    { id: 2, score: 70 },
    { id: 3, score: 90 },
];

const customers = [
    { id: 3, score: 80 },
    { id: 4, score: 90 },
    { id: 5, score: 50 },
    { id: 6, score: 70 },
];

const csAway = [2];

const result = customerSuccessBalancing(customerSuccess, customers, csAway);

console.log('Resultado do customerSuccessBalancing:', result);