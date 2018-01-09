import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { stateFilters } from 'mapStore/filter';

useStrict(true);

class Store {

}

const store = new Store();

export default store;
