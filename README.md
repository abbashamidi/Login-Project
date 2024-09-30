
# Auth learning

## Actors

- Client
- Server

## Senario

### Sign in

Client: fill username and password and send to server
Server: Check if the username exists and has the same password as the client sent
    - Generate a random token and save somewhere for the username
    - response to client and send the token
Client: Store the token in the local storage
Client: Send token for all requests to server in the "Authorization" header

### Sign up
