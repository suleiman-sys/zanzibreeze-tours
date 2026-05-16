import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function LocationPicker({

  formData,
  setFormData,

}) {

  const [position, setPosition] =
    useState([-6.1659, 39.2026]);

  const [search, setSearch] =
    useState("");

  function LocationMarker() {

    useMapEvents({

      click(e) {

        const coords = [
          e.latlng.lat,
          e.latlng.lng,
        ];

        setPosition(coords);

        setFormData((prev) => ({

          ...prev,

          pickupLocation:
            `${coords[0]}, ${coords[1]}`,

        }));

      },

    });

    return position ? (

      <Marker position={position}>

        <Popup>

          Pickup Location

        </Popup>

      </Marker>

    ) : null;

  }

  function ChangeMapView({

  coords,

}) {

  const map = useMap();

  map.setView(coords, 15);

  return null;

}

  const handleSearch = async () => {

    if (!search) return;

    try {

      const response = await fetch(

  `https://nominatim.openstreetmap.org/search?format=json&q=${search}`,

  {

    headers: {

      Accept: "application/json",

    },

  }

);

      const data =
        await response.json();

      if (data.length > 0) {
        console.log(data);
        const lat =
          parseFloat(data[0].lat);

        const lon =
          parseFloat(data[0].lon);

        setPosition([lat, lon]);

        setFormData((prev) => ({

          ...prev,

          pickupLocation:
            `${lat}, ${lon}`,

        }));

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="md:col-span-2">

      <label className="block mb-3 text-gray-300">

        Pickup Location

      </label>

      <div className="flex gap-4 mb-5">

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search hotel or location..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-orange-500"
        />

        <button
          type="button"
          onClick={handleSearch}
          className="bg-orange-500 hover:bg-orange-600 transition px-8 rounded-2xl font-semibold"
        >

          Search

        </button>

      </div>

      <div className="rounded-3xl overflow-hidden border border-white/10">

        <MapContainer
          center={position}
          zoom={12}
          style={{

            height: "400px",
            width: "100%",

          }}
        >

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         <ChangeMapView
            coords={position}
            />

          <LocationMarker />

        </MapContainer>

      </div>

      {formData.pickupLocation && (

  <div className="mt-5 bg-green-500/10 border border-green-500/20 rounded-2xl p-5">

    <p className="text-green-400 font-semibold mb-2">

      📍 Pickup Location Confirmed

    </p>

    <p className="text-gray-300 text-sm break-all">

      {formData.pickupLocation}

    </p>

  </div>

)}
    </div>

  );

}