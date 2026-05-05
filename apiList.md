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
- POST /request/send/:status/:userId -> dynamic API for status: ignored & interested (sender's side)
- POST /request/review/:status/:requestId -> dynamic API for status: accepted & rejected (receiver's side)

## userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - gets you the profiles of other users on platform

Status: ignored, interested, accepted, rejected


