const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,
            'Please enter a title'
        ]
    },
    genre: {
        type: String,
        required: [true,
            'At least one genre is required'
        ],
        trim: true
    },
    duration: {
        type: Number,
        required: [true,
            'Duration is required'
        ]
    },
    language: {
        type: String,
        required: [true,
            'Language is required'
        ],
        trim: true
    },
    showTimes: [
        {
            dateTime: {
                type: String,
                required: [true,
                    'Show Date and Time is required'
                ]
            },
            available_seats: {
                type: Number,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);