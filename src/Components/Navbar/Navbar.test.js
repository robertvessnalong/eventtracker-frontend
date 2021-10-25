import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Events Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Navbar />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const h1 = screen.getByText(/Event Finder/i);
    expect(h1).toBeInTheDocument();
  });

  // Snapshot
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Navbar />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
