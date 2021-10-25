import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Home Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Home />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const headerSpan = screen.getByText(/Find Events Near You/i);
    expect(headerSpan).toBeInTheDocument();
  });

  test('fireSubmit', async () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Home />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      fireEvent.change(getByRole('textbox', { name: /search/i }), {
        query: '',
      });
      fireEvent.submit(getByText('Find Events'));
    });
    const alertMsg = screen.getByText(/Sign Up To See More/i);
    expect(alertMsg).toBeInTheDocument();
  });

  // Snapshot
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Home />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
