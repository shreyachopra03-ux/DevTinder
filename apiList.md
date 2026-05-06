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
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - gets you the profile of other users on the platform

Status: ignored, interested, accepted, rejected


