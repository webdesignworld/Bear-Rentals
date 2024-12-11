import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaEuroSign,
} from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `€${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `€${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `€${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={property.images[0]}
        alt={property.name}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p className="flex items-center">
            <FaBed className="mr-2" />
            {property.beds} <span className="hidden lg:inline">Beds</span>
          </p>
          <p className="flex items-center">
            <FaBath className="mr-2" />
            {property.baths} <span className="hidden lg:inline">Baths</span>
          </p>
          <p className="flex items-center">
            <FaRulerCombined className="mr-2" />
            {property.square_meters}{" "}
            <span className="hidden lg:inline">sqm</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <p>
            <FaEuroSign className="mr-2" /> Weekly
          </p>
          <p>
            <FaEuroSign className="mr-2" /> Monthly
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex items-center gap-2 mb-4 lg:mb-0">
            <FaMapMarkerAlt className="text-red-700" />
            <span className="text-gray-700">
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
