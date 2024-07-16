function updateSortButtonsAppearance(sortCriteria, direction) {
    console.log("Sort criteria:", sortCriteria);
    console.log("Direction:", direction);

    // Reset button styles and arrows
    $('.btn').removeClass('active');
    $('.sort-arrow').empty();

    // Debug jQuery selection
    const selector = `#sort-${sortCriteria}-btn`;
    console.log("Attempting to select:", selector); // Debug
    const activeBtn = $(selector);
    console.log("Active button:", activeBtn); // Debug

    // Update active button and arrow
    activeBtn.addClass('active');

    const arrowIcon = direction === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
    activeBtn.find('.sort-arrow').html(`<i class="${arrowIcon}"></i>`);
}
