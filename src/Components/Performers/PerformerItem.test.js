import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PerformerItem from './PerformerItem';
import TestUser from '../../Testing/TestUser';
import TestPerformer from '../../Testing/TestPerfomer';
import UserContext from '../../Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Events Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <PerformerItem
            performer={TestPerformer}
            favorites={TestUser.favorites}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      const headerSpan = screen.getByText(/Billy Joel/i);
      expect(headerSpan).toBeInTheDocument();
    });
  });

  //Snapshot Test
  test('matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <PerformerItem
            performer={TestPerformer}
            favorites={TestUser.favorites}
          />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
