function calculateTotalPrice(startDate, endDate, numPeople, reservationType) {
    const dayCount = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    let totalPrice = 0;

    if (reservationType === 'parc') {
        switch (dayCount) {
            case 1:
                totalPrice = 65 * numPeople;
                break;
            case 2:
                totalPrice = 110 * numPeople;
                break;
            case 3:
                totalPrice = 150 * numPeople;
                break;
            case 4:
                totalPrice = 185 * numPeople;
                break;
            default:
                totalPrice = 0;
        }
    } else if (reservationType === 'parc+hotel') {
        switch (dayCount) {
            case 2:
                totalPrice = 210 * numPeople;
                break;
            case 3:
                totalPrice = 385 * numPeople;
                break;
            case 4:
                totalPrice = 560 * numPeople;
                break;
            default:
                totalPrice = 0;
        }
    }

    return totalPrice;
}

module.exports = calculateTotalPrice;