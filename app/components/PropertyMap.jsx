"use client";

import { setDefaults, fromAddress } from "react-geocode";
import { useEffect, useState } from "react";
import { CircleGauge } from "lucide-react";
import Map, {Marker} from "react-map-gl";
import Image from "next/image";
import pin from "../assets/images/pin.svg"
import Spinner from "./Spinner";
import 'mapbox-gl/dist/mapbox-gl.css';


const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "de",
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.postcode}`
        );
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport((prev) => ({ ...prev, latitude: lat, longitude: lng }));
      } catch (error) {
        console.error("Geocoding error:", error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, [property.location]);

  if (loading) return <Spinner/>;
  if (geocodeError)
    return <div>Error loading map. Please check the property location.</div>;

  return (
        !loading && (
                <Map
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                  mapLib={import('mapbox-gl')}
                  initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 15,
                  }}
                  style={{ width: '100%', height: 500 }}
                  mapStyle='mapbox://styles/mapbox/streets-v9'
                >
                  <Marker longitude={lng} latitude={lat} anchor='bottom'>
                    <Image src={pin} alt='location' width={40} height={40} />
                  </Marker>
                </Map>
        )
  );
};

export default PropertyMap;