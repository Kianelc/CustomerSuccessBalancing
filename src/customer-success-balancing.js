// Main function for balancing customers with available CSs
function customerSuccessBalancing(customerSuccess, customers, customerSuccessAway) {
  // Step 1: Initialize the list of customers attended by each CS
  for (const cs of customerSuccess) {
    cs.attendedCustomers = [];
  }

  // Step 2: Sort CS representatives and customers in ascending order based on the score
  const employeesSorted = sortByAscendingOrder(customerSuccess, "score");
  const customersSorted = sortByAscendingOrder(customers, "score");

  // Step 3: Distribute customers among available CS representatives
  const availableCustomerSuccess = employeesSorted.filter((cs) => !customerSuccessAway.includes(cs.id));

  for (const customer of customersSorted) {
    const csToAssign = findAvailableCSWithCapacity(availableCustomerSuccess, customer.score);
    if (csToAssign) {
      csToAssign.attendedCustomers.push(customer.id);
    }
  }

  // Step 4: Find the CS representative who attended the most customers, return 0 in case of a tie
  let mostAttendedCustomers = employeesSorted[0];
  let hasTie = false;

  for (let i = 1; i < employeesSorted.length; i++) {
    if (employeesSorted[i].attendedCustomers.length > mostAttendedCustomers.attendedCustomers.length) {
      mostAttendedCustomers = employeesSorted[i];
      hasTie = false;
    } else if (employeesSorted[i].attendedCustomers.length === mostAttendedCustomers.attendedCustomers.length) {
      hasTie = true;
    }
  }

  return hasTie ? 0 : mostAttendedCustomers.id;
}

// Sort CSs and customers in ascending order
function sortByAscendingOrder(data, attribute) {
  return [...data].sort((a, b) => a[attribute] - b[attribute]);
}

function findAvailableCSWithCapacity(availableCustomerSuccess, customerScore) {
  return availableCustomerSuccess.find((cs) => customerScore <= cs.score);
}

module.exports = customerSuccessBalancing;