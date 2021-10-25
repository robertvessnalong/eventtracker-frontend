import axios from 'axios';
import TestEvent from '../Testing/TestEvent';
import TestEvents from '../Testing/TestEvents';
import TestPerformer from '../Testing/TestPerfomer';
import TestPerformers from '../Testing/TestPerformers';
const BASE_URL = 'https://eventtracker-backend.herokuapp.com';

const ENV = process.env.REACT_APP_NODE_ENV;

class EventFinderApi {
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${EventFinderApi.token}`,
    };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Register */

  static async register(formData) {
    try {
      let res = await this.request(`users`, formData, 'post');
      this.token = res.token;
      return { token: res.token, user: res.user };
    } catch (e) {
      console.error('register failed');
      return { error: e };
    }
  }

  /** Get User Data */

  static async getUserInfo(user, token = null) {
    try {
      if (token !== null) {
        this.token = token;
      }
      let res = await this.request(`users/${user}`);
      return res.user;
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  /** Login */

  static async login(formData) {
    try {
      let res = await this.request(`auth/token`, formData, 'post');
      this.token = res.token;
      return { token: res.token, user: res.user };
    } catch (e) {
      console.error('login failed', e);
      return { error: e };
    }
  }

  /** Get Events */

  static async getEvents(param = {}) {
    if (ENV === 'TEST') {
      if (Object.keys(param).length > 0) {
        return [TestEvent];
      }
      return TestEvents;
    }
    try {
      let res = await this.request(`events`, param);
      return res;
    } catch (e) {
      console.error('getting events failed', e);
      return { error: e };
    }
  }

  /** Get Performers */

  static async getPerformers(param = {}) {
    if (ENV === 'TEST') {
      if (Object.keys(param).length > 0) {
        return [TestPerformer];
      }
      return TestPerformers;
    }
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.token = user.token;
      }
      let res = await this.request('performers', param);
      return res;
    } catch (e) {
      console.error('getting performers failed', e);
      return { error: e };
    }
  }

  /** Get Performer */

  static async getPerformer(param = {}) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.token = user.token;
      }
      let res = await this.request(`performers/${param.performerId}`, param);
      return res;
    } catch (e) {
      console.error('getting performer failed', e);
      return { error: e };
    }
  }

  /** Get Venues */

  static async getVenues(param = {}) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.token = user.token;
      }
      let res = await this.request(`venues`, param);
      return res;
    } catch (e) {
      console.error('getting venues failed', e);
      return { error: e };
    }
  }

  /** Update User */

  static async updateUser(userId, formData) {
    try {
      let res = await this.request(`users/${userId}`, formData, 'patch');
      return { user: res.user, success: 'Account Has Been Updated' };
    } catch (e) {
      console.error('update failed', e);
      return { error: e };
    }
  }

  /** Favorite Event or Performer */

  static async favoriteEvent(event) {
    try {
      let res = await this.request(`favorites`, event, 'post');
      return { favorite: 'success' };
    } catch (e) {
      console.error('favorite failed', e);
      return { error: e };
    }
  }

  /** Remove Favorite Event or Performer */

  static async removefavorite(flight) {
    try {
      let res = await this.request(`favorites`, flight, 'delete');
      return { favorite: 'deleted' };
    } catch (e) {
      console.error('favorite failed', e);
      return { error: e };
    }
  }

  /** Get Comments */

  static async getComments(param = {}) {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.token = user.token;
      }
      let res = await this.request(`comments`, param);
      return res;
    } catch (e) {
      console.error('getting comments failed', e);
      return { error: e };
    }
  }

  /** Create Comment */

  static async addComment(commentData) {
    try {
      let res = await this.request(`comments`, commentData, 'post');
      return res;
    } catch (e) {
      console.error('adding comment failed', e);
      return { error: e };
    }
  }

  /** Favorite Event Check */

  static favoriteCheck(favorites = [], event) {
    const { id } = event;
    let isFavorited;
    favorites.forEach((favorite, idx) => {
      if (Object.values(favorite).includes(id)) {
        isFavorited = true;
      }
    });
    return isFavorited;
  }

  /** Flight Time Converter */

  static eventTimeConverter(time) {
    if (!time) {
      return null;
    }

    const date = new Date(time);
    const newTime = date.toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
    const dateString = date.toDateString();
    return `${dateString} - ${newTime}`;
  }
}

export default EventFinderApi;
