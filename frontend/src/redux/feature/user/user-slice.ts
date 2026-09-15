"use client"

import { createSlice } from "@reduxjs/toolkit"
import {
    signupUser,
    loginUser,
    logoutUser,
} from "./user-action"
import Cookies from 'js-cookie';
import { UserState } from "./user-type";

const initialState: UserState = {
    user: null,
    loading: true,
    error: null,
    status: 'pending'
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.status = "pending";
            Cookies.remove("token")
            Cookies.remove("role")
        },
        resetAuthError: (state) => {
            state.error = null;
            state.status = "pending"
        }
    },
    extraReducers: (builder) => {
        builder
            .addAsyncThunk(signupUser, {
                pending: (state) => {
                    state.loading = true;
                    state.status = "pending";
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.error = null;
                    state.status = "succeed";
                    Cookies.set("role", action.payload.user.role);
                },
                rejected: (state, action) => {
                    state.loading = false;
                    state.status = "rejected";
                    state.user = null;
                    state.error = action.payload as string;
                    Cookies.remove("token");
                    Cookies.remove("role");
                }
            })
            .addAsyncThunk(loginUser, {
                pending: (state) => {
                    state.loading = true;
                    state.status = "pending";
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.status = "succeed";
                    state.error = null;
                    Cookies.set("role", action.payload.user.role);
                },
                rejected: (state, action) => {
                    state.loading = false;
                    state.status = "rejected";
                    state.error = action.payload as string;
                    Cookies.remove("token");
                    Cookies.remove("role");
                }
            })
            .addAsyncThunk(logoutUser, {
                pending: (state) => {
                    state.loading = true;
                    state.status = "pending";
                },
                fulfilled: (state) => {
                    state.user = null;
                    state.loading = false;
                    state.error = null;
                    state.status = "pending";
                    Cookies.remove("token");
                    Cookies.remove("role");
                },
                rejected: (state, action) => {
                    state.loading = false;
                    state.status = "rejected";
                    Cookies.remove("token");
                    Cookies.remove("role");
                    state.error = action.payload as string;
                }
            });
    }
})

export const { resetAuth, resetAuthError } = authSlice.actions;
export default authSlice.reducer
