
## Features

- Authentication with AuthJS (Formerly known as NextAuth)
- React Query for data fetching, cahching, and managment.
- Tailwind CSS & Radix UI Primitives.
- TypeScript throughout.
- Framer Motion for smooth, high performance animations.
- Date-fns for date manipulation.
- Turbopack for faster builds.
- Next-Intl for internationalization (Arabic & English Suported)
- Sonner for notifications.
- Database with SQLite powered by Turso.
- Zod for data & schema validation.
- Vercel for deployment.



## Design Choices

- The application is built on the modern app router, utilizing the powerful React Server Components (RSC).
- Most critical operations such as authentication, data fetching and data manipulation are handled by Server Actions, which are executed on the server always, ensuring no data leaks to the client.
- React Query plays an important role in managing the data throughout the application, providing a simple and efficient way to fetch, mutate and cache data, provide optimisitc updates, and keeping the data always up to date.
- LibSQL client powered by Turso.tech is used for database, this could be further replaced with a more robust ORM such as Drizzle, but for simplicity and ease of use, the libSQL client is used directly as it is never exposed to the client.
- The application follows a strict separation of concerns, with each component responsible for its own logic and state, making it easier to maintain and test.

