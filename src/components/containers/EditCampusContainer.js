/*==================================================
EditCampusContainer.js

================================================== */
import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
