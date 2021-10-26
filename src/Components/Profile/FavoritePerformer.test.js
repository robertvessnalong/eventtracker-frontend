import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoritePerformer from './FavoritePerformer';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Favorite Performer Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <FavoritePerformer />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const label = screen.getByText(
      /College Football Playoff National Championship Game/i
    );
    expect(label).toBeInTheDocument();
  });

  // Snapshot
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <FavoritePerformer />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
