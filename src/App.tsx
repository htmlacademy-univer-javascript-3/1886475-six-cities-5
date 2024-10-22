import React from 'react';
import { Main } from './pages/Main/Main.tsx';
import { PlaceCardProps } from './components/PlaceCard/PlaceCard.tsx';
<<<<<<< Updated upstream
type AppScreenProps = {
  places: PlaceCardProps[];
}
=======

type AppScreenProps = {
  places: PlaceCardProps[];
}

>>>>>>> Stashed changes
export const App: React.FC<AppScreenProps> = ({places}) => (
  <Main places={places}/>
);