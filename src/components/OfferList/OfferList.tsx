import React from 'react';
import {TPlaceCard} from '../../utils/types.ts';
import {PlaceCard} from '../PlaceCard/PlaceCard.tsx';
import {PlaceClassTypes} from '../../utils/const.ts';

interface IOfferListProps {
  offers: TPlaceCard[];
  onListItemHover: (listItemName: number | null) => void;
  listType: PlaceClassTypes;
}

export const OfferList: React.FC<IOfferListProps> = ({offers, onListItemHover, listType }): JSX.Element => (
  <div className={
    `${listType === PlaceClassTypes.Cities ? 'cities__places-list' : 'near-places__list'} places__list
    ${listType === PlaceClassTypes.Cities ? 'tabs__content' : null}`
  }
  >
    {offers.map((place) => (
      <PlaceCard
        key={place.id}
        place={place}
        placeCardType={listType}
        onMouseOver={() => onListItemHover(place.id)}
        onMouseLeave={() => onListItemHover(null)}
      />))}
  </div>
);