# TODO: End of 2023
0. ~~Look-At camera control === LOS do-it-yourself style~~
1. ~~Rest of MS1 chars~~
2. Dice animations
3. ~~Layout restyle~~
4. Game Log initiative
5. Ruins + Trees + Bridge + Jungle + Castle
6. Map Editor

## Pub/Sub in Context (thx google ai)
While React Context is a great way to share data between components, it doesn't inherently implement the Pub/Sub pattern. However, you can combine the two to create a Pub/Sub system within your React application.
Here's a simple implementation:
```js
import React, { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({});

  const subscribe = (eventName, callback) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [eventName]: [...(prevEvents[eventName] || []), callback]
    }));
  };

  const unsubscribe = (eventName, callback) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [eventName]: (prevEvents[eventName] || []).filter(cb => cb !== callback)
    }));
  };

  const publish = (eventName, data) => {
    (events[eventName] || []).forEach(callback => callback(data));
  };

  return (
    <EventContext.Provider value={{ subscribe, unsubscribe, publish }}>
      {children}
    </EventContext.Provider>
  );
};
export const useEvent = () => useContext(EventContext);
```
How to use:
Wrap your application with the EventProvider.
```js
import { EventProvider } from './EventContext'; 

function App() {
  return (
    <EventProvider>
      {/* Your components */}
    </EventProvider>
  );
}
```
Subscribe to events in components.
```js

import { useEvent } from './EventContext';

function MyComponent() {
  const { subscribe, unsubscribe } = useEvent();

  useEffect(() => {
    const handleEvent = (data) => {
      console.log('Event received:', data);
    };

    subscribe('myEvent', handleEvent);

    return () => unsubscribe('myEvent', handleEvent); 
  }, []);

  return (
    // ...
  );
}
```
Publish events from anywhere in your app:
```js
import { useEvent } from './EventContext';

function AnotherComponent() {
  const { publish } = useEvent();

  const handleClick = () => {
    publish('myEvent', 'Hello from AnotherComponent!');
  };

  return (
    <button onClick={handleClick}>Trigger Event</button>
  );
}
```

This approach leverages React Context for providing the Pub/Sub functionality throughout your application, allowing components to communicate in a decoupled manner.