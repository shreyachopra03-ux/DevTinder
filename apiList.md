# DEVTINDER API'S

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/views
- PATCH /profile/edit
- PATCH /profile/password -> Forgot password API

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:userId

## userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected


