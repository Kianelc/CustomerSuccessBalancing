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

  const totalAttendedCustomers = getTotalAttendedCustomers(assignedCustomerSuccess);

  return findCustomerSuccessWithMostCustomers(totalAttendedCustomers);
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

// Calcula o total de clientes atendidos pelos Customer Success (CSs)
function getTotalAttendedCustomers(customerSuccess) {
  for (const cs of customerSuccess) {
    cs.totalattendedCustomers = cs.attendedCustomers.length;
  }

  return customerSuccess;
}

// Encontrar o CS que mais atendeu clientes, caso empatar retorna zero
function findCustomerSuccessWithMostCustomers(customerSuccess) {
  let mostAttendedCustomers = customerSuccess[0];
  let hasTie = false;

  for (let index = 1; index < customerSuccess.length; index++) {
    if(customerSuccess[index].totalattendedCustomers > mostAttendedCustomers.totalattendedCustomers) {
      mostAttendedCustomers = customerSuccess[index];
      hasTie = false;
    } else if(customerSuccess[index].totalattendedCustomers == mostAttendedCustomers.totalattendedCustomers) {
      hasTie = true;
    }
  }

  return hasTie ? 0 : mostAttendedCustomers.id;
}


module.exports = customerSuccessBalancing;