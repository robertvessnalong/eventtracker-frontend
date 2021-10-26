import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import EventItem from './EventItem';
import TestUser from '../../Testing/TestUser';
import TestEvent from '../../Testing/TestEvent';
import UserContext from '../../Context/UserContext';

describe('EventItem Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <UserContext.Provider value={{ user: TestUser }}>
        <EventItem event={TestEvent} favorites={TestUser.favorites} />
      </UserContext.Provider>
    );
    await waitFor(() => {
      const headerSpan = screen.getByText(
        /The Great Jack OLantern Blaze - Long Island/i
      );
      expect(headerSpan).toBeInTheDocument();
    });
  });

  //Snapshot Test
  test('matches snapshot', () => {
    const { asFragment } = render(
      <UserContext.Provider value={{ user: TestUser }}>
        <EventItem event={TestEvent} favorites={TestUser.favorites} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  //Snapshot Logged In
  test('loggedIn snapshot', () => {
    const { asFragment } = render(
      <UserContext.Provider value={{ user: TestUser, loggedIn: true }}>
        <EventItem event={TestEvent} favorites={TestUser.favorites} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('fireFavorite', async () => {
    const { container } = render(
      <UserContext.Provider value={{ user: TestUser, loggedIn: true }}>
        <EventItem event={TestEvent} favorites={TestUser.favorites} />
      </UserContext.Provider>
    );
    expect(container.getElementsByClassName('favorite-btn').length).toBe(1);
    fireEvent.click(container.querySelector('.favorite-btn'));
  });

  test('fireComment', async () => {
    const { container } = render(
      <UserContext.Provider value={{ user: TestUser, loggedIn: true }}>
        <EventItem event={TestEvent} favorites={TestUser.favorites} />
      </UserContext.Provider>
    );
    fireEvent.click(screen.getByText('Comment'));
    expect(container.getElementsByClassName('Active').length).toBe(1);
  });
});
