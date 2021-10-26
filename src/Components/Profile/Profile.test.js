import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Profile Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Profile />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const label = screen.getByPlaceholderText(/First Name/i);
    expect(label).toBeInTheDocument();
  });
});
