import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileForm from './ProfileForm';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('ProfileForm Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <ProfileForm />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const label = screen.getByPlaceholderText(/First Name/i);
    expect(label).toBeInTheDocument();
  });

  test('update', () => {
    render(
      <UserContext.Provider value={{ user: TestUser }}>
        <ProfileForm />
      </UserContext.Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'Test' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Five' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'testfive@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Submit'));
  });

  // Snapshot
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <UserContext.Provider value={{ user: TestUser }}>
        <ProfileForm />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
