import React from 'react';

export type PlaceCardProps = {
  isPremium?: boolean;
  isBookmarked?: boolean;
  imageSrc: string;
  imageAlt?: string;
  price: number;
  rating: 1 | 2 | 3 | 4 | 5;
  name: string;
  type: PlaceType;
};
type PlaceType = 'Apartment' | 'Room';