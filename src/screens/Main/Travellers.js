import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

export default class Travellers extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
     };
  }

  componentWillMount() {
    this.fetchTravellerData();
  }

  fetchTravellerData = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
       fetch(url)
       .then(res => res.json())
       .then(res => {
       this.setState({
         data: page === 1 ? res.results : [...this.state.data, ...res.results],
         error: res.error || null,
         loading: false,
         refreshing: false
       });
     })
    .catch(error => {
      this.setState({ error, loading: false, refreshing: false });
    });
}

renderSeparator = () => {
  return (
    <View
    style={{
     height: 1,
     width: '86%',
     backgroundColor: '#CED0CE',
     marginLeft: '14%'
    }}
    />
  );
}

renderSearchHeader = () => {
  return <SearchBar placeholder="Type Here..." lightTheme round />;
}

renderActivityFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleRefresh = () => {
      this.setState({
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      }, () => {
        this.fetchTravellerData();
      });
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.fetchTravellerData();
    });
  }


  render() {
    return (
      <View>
         <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
              <FlatList
               data={this.state.data}
               keyExtractor={(item, index) => index}
               renderItem={({ item }) =>
               <ListItem
                   roundAvatar
                   avatar={{ uri: item.picture.thumbnail }}
                   title={`${item.name.first} ${item.name.last}`}
                   subtitle={item.email}
                   containerStyle={{ borderBottomWidth: 0 }}
               />}
               ItemSeparatorComponent={this.renderSeparator}
               ListHeaderComponent={this.renderSearchHeader}
               ListFooterComponent={this.renderActivityFooter}
               onRefresh={this.handleRefresh}
               refreshing={this.state.refreshing}
               onEndReached={this.handleLoadMore}
               onEndReachedThreshold={50}
              />
          </List>
      </View>
    );
  }
}
