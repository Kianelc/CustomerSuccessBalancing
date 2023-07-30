/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  const updatedCustomerSuccess = setCustomersServedForCSs(customerSuccess);

  const employeesSorted = sortByAscendingOrder(updatedCustomerSuccess, "score");

  const customersSorted = sortByAscendingOrder(customers, "score");

  const assignedCustomerSuccess =  distributeCustomersToCSs(customersSorted, employeesSorted, customerSuccessAway);
}

// Inicializar uma lista vazia para cada CS, representando os clientes atribuídos a eles
function setCustomersServedForCSs(customerSuccess) {
  for (let index = 0; index < customerSuccess.length; index++) {
    customerSuccess[index].attendedCustomers = [];
  }
  return customerSuccess;
}

// Ordenar CSs e customers em ordem crescente
function sortByAscendingOrder(data, attribute) {
  return [...data].sort((a, b) => a[attribute] - b[attribute]);
}

// Distribuir clientes entre os CSs
function distributeCustomersToCSs(customers, customerSuccess, customerSuccessAway) {
  const availableCustomerSuccess = filterAvailableCustomerSuccess(customerSuccess, customerSuccessAway);

  for (const customer of customers) {
    const csToAssign = findAvailableCSWithCapacity(availableCustomerSuccess, customer.score);
    if (csToAssign) {
      csToAssign.attendedCustomers.push(customer.id);
    }
  }

  return customerSuccess;
}

function filterAvailableCustomerSuccess(customerSuccess, customerSuccessAway) {
  return customerSuccess.filter((cs) => !customerSuccessAway.includes(cs.id));
}

function findAvailableCSWithCapacity(availableCustomerSuccess, customerScore) {
  return availableCustomerSuccess.find((cs) => customerScore <= cs.score);
}

module.exports = customerSuccessBalancing;