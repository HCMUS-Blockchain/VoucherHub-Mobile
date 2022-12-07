import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import getDirections from "react-native-google-maps-directions";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { Ionicons } from "@expo/vector-icons";

import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
const markersList = [
  {
    latlong: {
      latitude: 10.772727580714891,
      longitude: 106.69793497035313,
    },
    title: "The Coffee House",
    description: "Open: 8:00 AM and Close: 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    latlong: {
      latitude: 10.768914979703215,
      longitude: 106.69517085659679,
    },
    title: "Phuc Long",
    description: "Open: 7:30 AM and Close: 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    latlong: {
      latitude: 10.779615979567879,
      longitude: 106.69214524501788,
    },
    title: "KFC",
    description: "Open: 7:30 AM and Close: 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    latlong: {
      latitude: 10.772225560738665,
      longitude: 106.70569854162126,
    },
    title: "KFC",
    description: "Open: 7:30 AM and Close: 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHN0b3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    latlong: {
      latitude: 10.805043464064141,
      longitude: 106.69463785877657,
    },
    title: "Phuc Long 2",
    description: "Open: 7:30 AM and Close: 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHN0b3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    latlong: {
      latitude: 10.801558794590127,
      longitude: 106.69077498030903,
    },
    title: "KFC",
    description: "Open: 7:30 AM and Close: 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0b3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    latlong: {
      latitude: 10.79589344999518,
      longitude: 106.6955917182308,
    },
    title: "KFC",
    description: "Open: 7:30 AM and Close: 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3RvcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
];
const initialRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [initial, setInitial] = useState(initialRegion);
  const [markers, setMarkers] = useState(markersList);
  const _map = useRef(null);
  let mapAnimation = new Animated.Value(0);
  let mapIndex = 0;

  const handleGetDirections = (latlong, curLat, curLongt) => {
    const data = {
      source: {
        latitude: curLat,
        longitude: curLongt,
      },
      destination: {
        latitude: latlong.latitude,
        longitude: latlong.longitude,
      },
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };
    getDirections(data);
  };
  const interpolations = markers.map((marker, index) => {
    const inputRange = [(index - 1) * 250, index * 250, (index + 1) * 250];
    const outputRange = [1, 1.5, 1];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp",
    });

    return { scale };
  });

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const x = {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      let newMarkers = markers.map((marker, index) => {
        const dis = getDistance(
          { latitude: x.latitude, longitude: x.longitude },
          marker.latlong
        );
        marker.distance = dis;
      });
      newMarkers = markers.sort((a, b) => a.distance - b.distance);
      let yy = markers.map((marker, index) => {
        let x = marker.distance;
        if (x < 1000) {
          marker.distance = " " + x + " meters away";
        } else {
          x = (x / 1000).toString().slice(0, 3);
          marker.distance = " " + x + " kilometers away";
        }
      });
      setMarkers(newMarkers);
      setInitial(x);
      return x;
    };

    getCurrentLocation().then((x) => {
      _map.current.animateToRegion(x);
    });
  }, []);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / 250 + 0.3);
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      const regionTimeout = setTimeout(() => {
        if (mapIndex != index) {
          mapIndex = index;
          const { latlong } = markers[index];
          _map.current.animateToRegion(
            {
              ...latlong,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            350
          );
        }
      }, 10);
    });
  });
  return (
    <View style={styles.container}>
      <MapView ref={_map} style={styles.map} initialRegion={initial}>
        {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [{ scale: interpolations[index].scale }],
          };

          return (
            <Marker
              key={index}
              coordinate={marker.latlong}
              style={{ padding: 10 }}
            >
              <Animated.View>
                <Animated.Image
                  source={require("../assets/img/map_marker.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                ></Animated.Image>
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToEnd={270}
        snapToAlignment="center"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <View>
              <Image
                style={styles.tinyLogo}
                source={{ uri: `${marker.image}` }}
              />
            </View>

            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {marker.description}
              </Text>
              <Text>
                <Ionicons name="location" size={18} color="red" />
                {marker.distance}
              </Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  handleGetDirections(
                    marker.latlong,
                    initial.latitude,
                    initial.longitude
                  );
                }}
                style={[
                  styles.signIn,
                  {
                    borderColor: "#FF6347",
                    borderWidth: 1,
                  },
                ]}
              >
                <Text style={[styles.textSign, { color: "#FF6347" }]}>
                  Direction
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: "100%",
    width: 250,
    overflow: "hidden",
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  tinyLogo: {
    width: "100%",
    height: 120,
  },

  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default MapScreen;
