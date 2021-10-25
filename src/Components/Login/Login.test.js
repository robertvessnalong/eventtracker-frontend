import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';


describe('Events Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <UserContext.Provider value={{ user: TestUser }}>
        <Login />
      </UserContext.Provider>
    );

    const label = screen.getByLabelText(/Email Address/i);
    expect(label).toBeInTheDocument();
  });

  // Snapshot
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <UserContext.Provider value={{ user: TestUser }}>
        <Login />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
