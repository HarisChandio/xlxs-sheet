const searchQuery = (query, data) => {
  let filteredData = data.filter((item) => {
    return item.subject.toString().toLowerCase().includes(query.toLowerCase());
  });
  let queryResult = {};
  filteredData.forEach((item) => {
    if (item.day in queryResult) {
      queryResult[item.day].push(item);
    } else {
      queryResult[item.day] = [item];
    }
  });
  return queryResult;
};


module.exports = searchQuery;