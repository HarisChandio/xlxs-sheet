const searchQuery = (query, data) => {
  let filteredData = data.filter((item) => {
    // Check if the subject, day, or venue exact match the query
    return (
      item.subject.toString().toLowerCase().includes(query.toLowerCase()) ||
      item.day.toString().toLowerCase().includes(query.toLowerCase()) ||
      item.venue.toString().toLowerCase() === query.toLowerCase()
    );
  });

  // Group filtered data by day
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
