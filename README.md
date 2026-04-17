## Redux Setup

This project uses Redux Toolkit for global state management

### Structure

* Store: `/store`
* Slices: `/store/slices`

### User State

* `setUser` → store user data
* `clearUser` → remove user data

### Usage

* Read data:
  `useSelector((state) => state.user.user)`

* Update data:
  `dispatch(setUser(data))`

### Notes

* Redux is connected in `/app/layout.tsx`
* To add a new feature, create a new slice and add it to the store
