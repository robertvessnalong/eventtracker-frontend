import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import EventFinderApi from '../../API/api';

const login = async (data) => {
  const res = await EventFinderApi.login(data);
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
  return { login: 'success' };
};

describe('Login Component', () => {
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

  test('login', () => {
    render(
      <UserContext.Provider value={{ user: TestUser, login }}>
        <Login />
      </UserContext.Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'robert@gmail.com' },
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
        <Login />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
