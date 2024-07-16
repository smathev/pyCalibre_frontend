// sortBooks.js
function sortBooks(data, sortCriteria, direction) {
    data.sort((a, b) => {
        let valA, valB;

        if (sortCriteria === 'date_added' || sortCriteria === 'date_updated') {
            valA = new Date(a[sortCriteria]);
            valB = new Date(b[sortCriteria]);
        } else {
            valA = a[sortCriteria].toLowerCase();
            valB = b[sortCriteria].toLowerCase();
        }

        if (direction === 'asc') {
            return valA < valB ? -1 : (valA > valB ? 1 : 0);
        } else {
            return valB < valA ? -1 : (valB > valA ? 1 : 0);
        }
    });

    return data;
}