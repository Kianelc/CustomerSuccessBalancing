function customerSuccessBalancing(customerSuccessList, customers, customerSuccessAway) {
  const availableCustomerSuccess = getAvailableCustomerSuccess(customerSuccessList, customerSuccessAway);
  calculateAttendedCustomers(availableCustomerSuccess, customers);
  return findBestCustomerSuccess(availableCustomerSuccess);
}

function getAvailableCustomerSuccess(customerSuccessList, customerSuccessAway) {
  return customerSuccessList
    .filter(cs => !customerSuccessAway.includes(cs.id))
    .sort((a, b) => a.score - b.score);
}

function calculateAttendedCustomers(availableCustomerSuccess, customers) {
  customers.forEach(customer => {
    const matchedCS = availableCustomerSuccess.find(cs => customer.score <= cs.score);
    if (matchedCS) {
      matchedCS.attendedCustomers = (matchedCS.attendedCustomers || 0) + 1;
    }
  });
}

function findBestCustomerSuccess(availableCustomerSuccess) {
  let maxAttended = 0;
  let bestCS = 0;

  availableCustomerSuccess.forEach(cs => {
    const attendedCustomers = cs.attendedCustomers || 0;
    if (attendedCustomers > maxAttended) {
      maxAttended = attendedCustomers;
      bestCS = cs.id;
    } else if (attendedCustomers === maxAttended) {
      bestCS = 0;
    }
  });

  return bestCS;
}

module.exports = customerSuccessBalancing;
