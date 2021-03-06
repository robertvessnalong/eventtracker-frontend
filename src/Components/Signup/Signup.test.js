import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from './Signup';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import EventFinderApi from '../../API/api';

// Sign Up Function
const signUp = async (data) => {
  const res = await EventFinderApi.register(data);
  if (res.error) {
    return res;
  }
  localStorage.setItem(
    'user',
    JSON.stringify({
      token: res.token,
      user: res.user.uuid,
      firstName: res.user.firstName,
    })
  );
  return { register: 'success' };
};

describe('Signup Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <UserContext.Provider value={{ user: TestUser }}>
        <Signup />
      </UserContext.Provider>
    );

    const label = screen.getByLabelText(/Email Address/i);
    expect(label).toBeInTheDocument();
  });

  test('signUp', () => {
    render(
      <UserContext.Provider value={{ user: TestUser, signUp }}>
        <Signup />
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
        <Signup />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
