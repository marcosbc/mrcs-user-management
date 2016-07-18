# mrcs-user-management

## Introduction

This is a simple API-based user management server, which allows you to
list, create, modify and delete users with HTTP requests.

### API reference

The different request types are listed below:

- `GET /users`: List all available users.
- `POST /users`: Create a user. A few parameters are needed in order to
  create a user (`username`, `email`, `password`, `fullName`).
- `GET /users/:id`: Showing the entry of a specific user.
- `POST /users/:id`: Update a specific user's data (all fields need to
  be passed).
- `DELETE /users/:id`: Delete a specific user.

Note that `:id` stands for the user's `_id` field in the database.

### Liveness and readiness

This server implements a liveness and readiness page, accessible at
`/liveness` and `/readiness` respectively:

- `/liveness` will always show a simple `{"hello":"world"}` response,
  used to checking whether the microservice is running or not (if it is
  not, the page would not be accessible).
- `/readiness` will show a simple `{"ready":STATUS}` response, where
  STATUS is either `true` or `false`, depending on whether the database
  was initialized or not.

## License

Copyright 2016 Marcos Bjørkelund

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

