## API Endpoints:
<!-- add admin auth and movie add,delete,update,review-->
- POST /api/admin/auth/register
- POST /api/admin/auth/login
- POST /api/admin/movie/add
- POST /api/admin/movie/delete
- POST /api/admin/movie/update
- POST /api/admin/movie/review

## Authentication
- POST /api/auth/register: User registration
- POST /api/auth/login: User login


## Movies
- GET /api/movies: Fetch all movies
- GET /api/movies/:id: Get details of a movie

## Bookings
- POST /api/bookings: Create a booking
- GET /api/bookings/:id: Get booking details
- DELETE /api/bookings/:id: Cancel a booking

## Payments
-POST /api/payments: Process payment