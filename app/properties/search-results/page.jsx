import Link from "next/link";
import PropertyCard from "../../components/PropertyCard";
import PropertySearchForm from "../../components/PropertySearchForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import connectDB from "../../../config/database";
import Property from "../../../models/Property";
import { convertToSerializeableObject } from "../../../utils/convertToObject";

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();

  const locationPattern = new RegExp(location, "i");
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.postcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializeableObject(propertiesQueryResults);
  console.log(properties);
  return (
    <>
      <section className="bg-purple-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6 ">
        <div className="container-xl lg:container m-auto px-4 py-6 ">
          <Link
            href="/properties"
            className="flex items-center bext-purple-500 mr-4 "
          >
            <FaArrowAltCircleLeft className="mr-4"/>
            Back to Properties
          </Link>
          <h1 className="text-2xl mb-4 font-bold">Search Results</h1>
          {properties.length === 0 ? (   <p>No search results</p>) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property, index) => (
                <PropertyCard property={property} key={index} />
              ))}
            </div>
          )

          }
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
