import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Events from './Events';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';

describe('Events Component', () => {
  afterEach(jest.clearAllMocks);
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <UserContext.Provider value={{ user: TestUser }}>
        <Events />
      </UserContext.Provider>
    );
    await waitFor(() => {
      const headerSpan = screen.getByText(/Find Events Near You/i);
      expect(headerSpan).toBeInTheDocument();
    });
  });
  // Smoke Test
  test('Alert Not Rendered', async () => {
    render(
      <UserContext.Provider value={{ user: TestUser }}>
        <Events />
      </UserContext.Provider>
    );
    await waitFor(() => {
      const alertMsg = screen.queryByText(/Sorry, no events found! Try Again/i);
      expect(alertMsg).not.toBeInTheDocument();
    });
  });

  test('fireSubmit', async () => {
    const { getByText, getByRole } = render(
      <UserContext.Provider value={{ user: TestUser }}>
        <Events />
      </UserContext.Provider>
    );
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    await waitFor(() => {
      fireEvent.change(getByRole('textbox', { name: /search/i }), {
        query: '',
      });
      fireEvent.submit(getByText('Find Events'));
    });
    const alertMsg = screen.getByText(
      /The Great Jack OLantern Blaze - Long Island/i
    );
    expect(alertMsg).toBeInTheDocument();
  });

  // Snapshot
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <UserContext.Provider value={{ user: TestUser }}>
        <Events />
      </UserContext.Provider>
    );
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    expect(asFragment()).toMatchSnapshot();
  });
});
