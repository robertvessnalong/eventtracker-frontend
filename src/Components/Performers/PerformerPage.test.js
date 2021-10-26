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
import PerformerPage from './PerformerPage';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Events Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser, loggedIn: true }}>
          <PerformerPage />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      const headerSpan = screen.getByText(/Billy Joel/i);
      expect(headerSpan).toBeInTheDocument();
    });
  });

  // Snapshot
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <PerformerPage />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    expect(asFragment()).toMatchSnapshot();
  });
});
