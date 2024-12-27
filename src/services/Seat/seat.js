function generateSeats(movieId) {
    const layout = [
        { row: 'A', seats: 10, price: 480 },
        { row: 'B', seats: 8, price: 290 },
        { row: 'C', seats: 8, price: 290 },
        { row: 'D', seats: 20, price: 250 },
        { row: 'E', seats: 20, price: 250 },
        { row: 'F', seats: 20, price: 250 },
        { row: 'G', seats: 20, price: 250 },
        { row: 'H', seats: 20, price: 250 },
        { row: 'I', seats: 20, price: 250 },
        { row: 'J', seats: 20, price: 250 },
        { row: 'K', seats: 20, price: 250 },
        { row: 'L', seats: 20, price: 250 },
        { row: 'M', seats: 20, price: 230 },
        { row: 'N', seats: 20, price: 230 },
        { row: 'O', seats: 20, price: 230 },
        { row: 'P', seats: 20, price: 230 },
    ];

    const rows = layout.map(({ row, seats, price }) => {
        const seatsArray = [];
        for (let i = 1; i <= seats; i++) {
            seatsArray.push({
                seatNumber: `${row}${i}`,
                isBooked: false,
                price,
            });
        }

        return {
            rowName: row,
            seats: seatsArray,
        };
    });

    return {
        movie: movieId,
        screenName: 'Default Screen',
        rows,
    };
}

module.exports = generateSeats;
