// Movie class
class Movie {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

// Show class
class Show {
    constructor(id, movieId, time, totalSeats) {
        this.id = id;
        this.movieId = movieId;
        this.time = time;
        this.totalSeats = totalSeats;
        this.bookedSeats = 0;
    }

    bookSeat() {
        if (this.bookedSeats < this.totalSeats) {
            this.bookedSeats++;
            return true;
        }
        return false;
    }

    cancelSeat() {
        if (this.bookedSeats > 0) {
            this.bookedSeats--;
            return true;
        }
        return false;
    }
}

// Booking class
class Booking {
    constructor(id, showId, userId) {
        this.id = id;
        this.showId = showId;
        this.userId = userId;
    }
}

// MovieBookingSystem (Main Service)
class MovieBookingSystem {
    constructor() {
        this.movies = new Map();      // movieId -> Movie
        this.shows = new Map();       // showId -> Show
        this.bookings = new Map();    // bookingId -> Booking
        this.bookingCounter = 1;
    }

    addMovie(id, name) {
        const movie = new Movie(id, name);
        this.movies.set(id, movie);
    }

    addShow(id, movieId, time, totalSeats) {
        if (!this.movies.has(movieId)) {
            console.log("Movie doesn't exist.");
            return;
        }
        const show = new Show(id, movieId, time, totalSeats);
        this.shows.set(id, show);
    }

    viewShowsByMovie(movieId) {
        if (!this.movies.has(movieId)) return [];
        const result = [];
        for (const show of this.shows.values()) {
            if (show.movieId === movieId) {
                result.push(show);
            }
        }
        return result;
    }

    bookTicket(showId, userId) {
        const show = this.shows.get(showId);
        if (!show) return null;
        const success = show.bookSeat();
        if (!success) return null;

        const bookingId = "B" + this.bookingCounter++;
        const booking = new Booking(bookingId, showId, userId);
        this.bookings.set(bookingId, booking);
        return booking;
    }

    cancelTicket(bookingId) {
        const booking = this.bookings.get(bookingId);
        if (!booking) return false;

        const show = this.shows.get(booking.showId);
        if (!show) return false;

        const success = show.cancelSeat(booking.userId);
        if (!success) return false;

        this.bookings.delete(bookingId);
        return true;
    }
}


const system = new MovieBookingSystem();

// Add movie
system.addMovie("M1", "Thudarum");

system.addMovie("M2", "Naravetta");

// Add show
system.addShow("S1", "M1", "18:00", 2);

system.addShow("S2", "M2", "12:00", 2);

// View shows
console.log("Shows for Thudarum:", system.viewShowsByMovie("M1"));

console.log("Shows for Naravetta:", system.viewShowsByMovie("M2"));

// Book ticket
const booking1 = system.bookTicket("S1", "U1");
console.log("Booking 1:", booking1);

// Book another ticket
const booking2 = system.bookTicket("S1", "U2");
console.log("Booking 2:", booking2);

// Try to book when full
const booking3 = system.bookTicket("S1", "U3");
console.log("Booking 3 (should fail):", booking3);

// Cancel a booking
const cancelResult = system.cancelTicket(booking1.id);
console.log("Cancelled booking1:", cancelResult);

// Book again after cancel
const booking4 = system.bookTicket("S1", "U4");
console.log("Booking 4 (should succeed):", booking4);


const booking5 = system.bookTicket("S2", "U5");
console.log("Booking 5 (should succeed):", booking5);

const booking6 = system.bookTicket("S2", "U6");
console.log("Booking 6 (should succeed):", booking6);

const booking7 = system.bookTicket("S2", "U7");
console.log("Booking 7 (should failed):", booking7);

const cancelResult2 = system.cancelTicket(booking6.id);
console.log("Cancelled booking6", cancelResult2);

const booking8 = system.bookTicket("S2", "U8");
console.log("Booking 8 (should succ):", booking8);