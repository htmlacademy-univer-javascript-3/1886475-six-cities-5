import {useMemo, useState} from 'react';
import {TPlaceCard} from '../../utils/types.ts';
import {OfferList} from '../../components/OfferList/OfferList.tsx';
import {Map} from '../../components/map/map.tsx';
import {PlaceClassTypes, SortName} from '../../utils/const.ts';
import {CityList} from '../../components/city-list/CityList.tsx';
import {useAppSelector} from '../../store/hooks.ts';
import {SortFilter} from '../../components/sort-filter/SortFilter.tsx';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {Header} from '../../components/header/header.tsx';

export const Main = () => {

  const [selectedPlace, setSelectedPlace] = useState<TPlaceCard | undefined>(undefined);
  const [currentFilter, setCurrentFilter] = useState<SortName>(SortName.POPULAR);

  const currentCity = useAppSelector((state) => state.city);
  const currentOffers = useAppSelector((state) => state.offers);
  const isLoading = useAppSelector((state) => state.isOffersDataLoading);

  const handleListItemHover = (placeItemId: string | null) => {
    const currentPlace = currentOffers.find((place) => place.id === placeItemId);
    if (selectedPlace !== currentPlace) {
      setSelectedPlace(currentPlace);
    }
  };

  const onFilterChange = (filter: SortName) => {
    setCurrentFilter(filter);
  };

  const sortedOffers = useMemo(() => {
    const offers = currentOffers.filter((offer) => offer.city.name === currentCity.name);
    switch (currentFilter) {
      case SortName.TOP_RATED:
        return offers.toSorted((a, b) => b.rating - a.rating);
      case SortName.HIGH_TO_LOW:
        return offers.toSorted((a, b) => b.price - a.price);
      case SortName.LOW_TO_HIGH:
        return offers.toSorted((a, b) => a.price - b.price);
      default:
        return offers;
    }
  }, [currentOffers, currentFilter, currentCity]);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedOffers?.length} places to stay in {currentCity.name}</b>
              <SortFilter currentFilter={currentFilter} onFilterChange={onFilterChange}/>
              {isLoading
                ? <Spinner/>
                : <OfferList offers={sortedOffers} onListItemHover={handleListItemHover} listType={PlaceClassTypes.Cities}/>}
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={currentCity} places={sortedOffers} selectedPlace={selectedPlace}/>
              </section>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};
