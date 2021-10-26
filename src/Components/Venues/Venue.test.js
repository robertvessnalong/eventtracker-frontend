import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Venues from './Venues';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Venue Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Venues />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    const label = screen.getByText(/Find A Venue Near You/i);
    expect(label).toBeInTheDocument();
  });

  // Snapshot
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Venues />
        </UserContext.Provider>
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('fireSubmit', async () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Venues />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    await waitFor(() => {
      fireEvent.change(getByRole('textbox', { name: /search/i }), {
        query: '',
      });
      fireEvent.submit(getByText('Find Venue'));
    });
    const alertMsg = screen.getByText(/McGuirk Arena/i);
    expect(alertMsg).toBeInTheDocument();
  });

  test('updated snapshot', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Venues />
        </UserContext.Provider>
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
