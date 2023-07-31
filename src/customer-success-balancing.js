// Main function for balancing customers with available CSs
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  setCustomersServedForCSs(customerSuccess);

  const employeesSorted = sortByAscendingOrder(customerSuccess, "score");
  const customersSorted = sortByAscendingOrder(customers, "score");

  distributeCustomersToCSs(customersSorted, employeesSorted, customerSuccessAway);

  getTotalAttendedCustomers(employeesSorted);

  return findCustomerSuccessWithMostCustomers(employeesSorted);
}

// Initialize an empty list for each CS, representing the customers assigned to them
function setCustomersServedForCSs(customerSuccess) {
  for (const cs of customerSuccess) {
    cs.attendedCustomers = [];
  }
}

// Sort CSs and customers in ascending order
function sortByAscendingOrder(data, attribute) {
  return [...data].sort((a, b) => a[attribute] - b[attribute]);
}

// Distribute customers among available CSs
function distributeCustomersToCSs(customers, customerSuccess, customerSuccessAway) {
  const availableCustomerSuccess = filterAvailableCustomerSuccess(customerSuccess, customerSuccessAway);

  for (const customer of customers) {
    const csToAssign = findAvailableCSWithCapacity(availableCustomerSuccess, customer.score);
    if (csToAssign) {
      csToAssign.attendedCustomers.push(customer.id);
    }
  }
}

function filterAvailableCustomerSuccess(customerSuccess, customerSuccessAway) {
  return customerSuccess.filter((cs) => !customerSuccessAway.includes(cs.id));
}

function findAvailableCSWithCapacity(availableCustomerSuccess, customerScore) {
  return availableCustomerSuccess.find((cs) => customerScore <= cs.score);
}

// Calculate the total of customers attended by each Customer Success (CS)
function getTotalAttendedCustomers(customerSuccess) {
  for (const cs of customerSuccess) {
    cs.totalAttendedCustomers = cs.attendedCustomers.length;
  }
}

// Find the CS that attended the most customers, return 0 in case of a tie
function findCustomerSuccessWithMostCustomers(customerSuccess) {
  let mostAttendedCustomers = customerSuccess[0];
  let hasTie = false;

  for (let index = 1; index < customerSuccess.length; index++) {
    if (customerSuccess[index].totalAttendedCustomers > mostAttendedCustomers.totalAttendedCustomers) {
      mostAttendedCustomers = customerSuccess[index];
      hasTie = false;
    } else if (customerSuccess[index].totalAttendedCustomers === mostAttendedCustomers.totalAttendedCustomers) {
      hasTie = true;
    }
  }

  return hasTie ? 0 : mostAttendedCustomers.id;
}

module.exports = customerSuccessBalancing;