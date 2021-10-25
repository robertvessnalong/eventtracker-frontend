import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  getByPlaceholderText,
  getByLabelText,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Performers from './Performers';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Events Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Performers />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      const headerSpan = screen.getByText(/See Your Favorite Performers Show/i);
      expect(headerSpan).toBeInTheDocument();
    });
  });
  // Smoke Test
  test('Alert Not Rendered', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Performers />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      const alertMsg = screen.queryByText(/Sorry, no events found! Try Again/i);
      expect(alertMsg).not.toBeInTheDocument();
    });
  });

  test('fireSubmit', async () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Performers />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    await waitFor(() => {
      fireEvent.change(getByRole('textbox', { name: /search/i }), {
        query: '',
      });
      fireEvent.submit(getByText('Find Performer'));
    });
    const alertMsg = screen.getByText(/Billy Joel/i);
    expect(alertMsg).toBeInTheDocument();
  });

  // Snapshot
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Performers />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    expect(asFragment()).toMatchSnapshot();
  });
});
