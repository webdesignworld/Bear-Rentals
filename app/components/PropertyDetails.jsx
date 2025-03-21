import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";
import PropertyMap from "./PropertyMap";

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4 dark:text-gray-500">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className="text-orange-700 mt-1 mr-1" />
          <p className="text-orange-700">
            {property.location.street}, {property.location.city}{" "}
            {property.location.postcode}
          </p>
        </div>
        <h3 className="text-lg font-bold mb-6 dark:text-gray-500">Rates and Options</h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Nightly</div>
            <div className="text-lg font-bold text-purple-500">
              {property.rates.nightly ? (
                `€${property.rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Weekly</div>
            <div className="text-lg font-bold text-purple-500">
              {property.rates.weekly ? (
                `€${property.rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Monthly</div>
            <div className="text-lg font-bold text-purple-500">
              {property.rates.monthly ? (
                `€${property.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6 dark:text-gray-500">Description & Details</h3>
        <div className="flex justify-center gap-4 text-purple-500 mb-4 text-xl space-x-9">
          <p>
            <FaBed className="inline-block mr-2" /> {property.beds}{" "}
            <span className="hidden sm:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" /> {property.baths}{" "}
            <span className="hidden sm:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />
            <span className="hidden sm:inline">
              {property.square_meters} m²
            </span>
          </p>
        </div>
        <p className="text-gray-500 mb-4">{property.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6 dark:text-gray-500">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2 dark:text-gray-500">
          {property.amenities.map((amenity, index) => (
            <li key={index}>
              <FaCheck className="inline-block text-green-600 mr-2 dark:text-gray-500" /> {amenity}
            </li>
          ))}
        </ul>
      </div>
      {/* <!-- Map --> */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <PropertyMap property={property}/>
      </div>
    </main>
  );
};

export default PropertyDetails;
