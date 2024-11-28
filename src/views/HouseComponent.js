// src/HouseComponent.js
import React, { useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Flipping from 'flipping';

const HouseComponent = () => {
  const houseRef = useRef(null);
  const rangeRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const house = houseRef.current;
    const range = rangeRef.current;
    const label = labelRef.current;

    const f = new Flipping();
    const update = f.wrap((rooms) => {
      const prevRooms = house.getAttribute('data-rooms');
      house.setAttribute('data-prev-rooms', prevRooms);
      house.setAttribute('data-rooms', rooms);

      label.setAttribute('data-prev-rooms', prevRooms);
      label.setAttribute('data-rooms', rooms);
      label.setAttribute('data-rooms-delta', rooms - prevRooms);
    });

    const range$ = fromEvent(range, 'input').pipe(
      map((e) => e.target.value),
      startWith(8)
    );

    const subscription = range$.subscribe(update);

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="house" id="house" data-rooms="6" ref={houseRef}>
        {/* ... (your house structure) ... */}
      </div>

      <label className="house-label" htmlFor="range" id="label" ref={labelRef}>
        Rooms
      </label>

      <input
        type="range"
        min="3"
        max="8"
        step="1"
        value="8"
        id="range"
        ref={rangeRef}
      />
    </div>
  );
};

export default HouseComponent;
