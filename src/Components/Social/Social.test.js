import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Social from './Social';
import TestUser from '../../Testing/TestUser';
import UserContext from '../../Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Social Component', () => {
  // Smoke Test
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Social />
        </UserContext.Provider>
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
    const label = screen.getByText(/I am ready for this event!/i);
    expect(label).toBeInTheDocument();
  });

  // Snapshot
  test('matches snapshot', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: TestUser }}>
          <Social />
        </UserContext.Provider>
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
