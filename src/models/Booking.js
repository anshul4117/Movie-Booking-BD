const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Movie ID is required'],
    },
    showtime: {
      type: Date,
      required: [true, 'Showtime is required'],
    },
    seats: {
      type: [String],
      required: [true, 'Seats are required'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Boooking = mongoose.model('Booking', bookingSchema);