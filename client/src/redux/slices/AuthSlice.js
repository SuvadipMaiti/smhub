import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiUrl from '../../helpers/api';
import * as url from '../../helpers/url';

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async ({ userData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.register(userData);
      console.log('response.data', response);
      if (response.data.status) {
        toast.success(response.data.message);
        navigate(url.login());
      } else {
        toast.error(response.data.message);
      }
      const registerData = response.data.data;
      return { registerData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ userData, navigate, dispatch, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.login(userData);
      if (response.data.status) {
        if (response.data.data.token) {
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...response.data.data })
          );
          toast.success(response.data.message);
          navigate(url.dashboard());
        }
      } else {
        toast.error(response.data.message);
      }
      const loginData = response.data.data;
      return { loginData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const loginGoogleAsync = createAsyncThunk(
  'auth/loginGoogleAsync',
  async ({ userData, navigate, dispatch, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.logingoogle(userData);
      if (response.data.status) {
        if (response.data.data && response.data.data.token) {
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...response.data.data })
          );
          toast.success(response.data.message);
          navigate(url.dashboard());
        }else{
          toast.success(response.data.message);
        }
      } else {
        toast.error(response.data.message);
      }
      const loginData = response.data.data;
      return { loginData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const loginFacebookAsync = createAsyncThunk(
  'auth/loginFacebookAsync',
  async ({ userData, navigate, dispatch, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.loginfacebook(userData);
      if (response.data.status) {
        if (response.data.data && response.data.data.token) {
          console.log('facebook login token', response.data.data.token);
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...response.data.data })
          );
          toast.success(response.data.message);
          navigate(url.dashboard());
        }else{
          toast.success(response.data.message);
        }
      } else {
        toast.error(response.data.message);
      }
      const loginData = response.data.data;
      return { loginData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);


export const authAsync = createAsyncThunk(
  'auth/authAsync',
  async ({ toast,dispatch }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.auth();
      if (response.data.status) {
        if (response.data.data.token) {
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...response.data.data })
          );
          // toast.success(response.data.message);
        }
      } else {
        dispatch(setLogout());
        // toast.error(response.data.message);
      }
      const authData = response.data.data;
      return { authData };
    } catch (err) {
      dispatch(setLogout());
      // toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const profileUpdateAsync = createAsyncThunk(
  'auth/profileUpdateAsync',
  async ({ id, profileData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.profileUpdate(profileData, id);
      if (response.data.status) {
        if (response.data.data.token) {
          localStorage.setItem(
            'auth',
            JSON.stringify({ ...response.data.data })
          );
          toast.success(response.data.message);
          navigate(url.dashboard());
        }
      } else {
        toast.error(response.data.message);
      }
      const profileUpdateData = response.data.data;
      return { profileUpdateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const profileDetailsAsync = createAsyncThunk(
  'auth/profileDetailsAsync',
  async ({ profileid, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.profileDetails(profileid);
      if (response.data.status) {
        const profileDetailsData = response.data.data;
        return { profileDetailsData };
        // toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      const profileUpdateData = response.data.data;
      return { profileUpdateData };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

export const contactListAsync = createAsyncThunk(
  'auth/contactListAsync',
  async ({ contactData, navigate, toast }, { rejectedWithValue }) => {
    try {
      const response = await apiUrl.contactList(contactData);
      if (response.data.status) {
        // toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      const contactList = response.data.data;
      return { contactList };
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectedWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userregister: {},
    auth: JSON.parse(localStorage.getItem('auth'))
      ? JSON.parse(localStorage.getItem('auth'))
      : null,
    contacts: {},
    profileDetails: {},
    error: '',
    loading: false,
  },
  reducers: {
    setLogout: (state, action) => {
      localStorage.clear();
      state.auth = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(registerAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.userregister = action.payload.registerData;
      console.log('registration sucessfully!');
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(loginAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload.loginData;
      console.log('login sucessfully!');
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(loginGoogleAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginGoogleAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload.loginData;
      console.log('login google sucessfully!');
    });
    builder.addCase(loginGoogleAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(loginFacebookAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginFacebookAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload.loginData;
      console.log('login facebook sucessfully!');
    });
    builder.addCase(loginFacebookAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(authAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(authAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload.authData;
      console.log('auth data');
    });
    builder.addCase(authAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(profileUpdateAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(profileUpdateAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload.profileUpdateData;
      console.log('profile updated!');
    });
    builder.addCase(profileUpdateAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(profileDetailsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(profileDetailsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.profileDetails = action.payload.profileDetailsData;
      console.log('profile details!');
    });
    builder.addCase(profileDetailsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(contactListAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(contactListAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = action.payload.contactList;
      console.log('chat contact list');
    });
    builder.addCase(contactListAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
