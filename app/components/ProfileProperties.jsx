"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import deleteProperty from "../actions/deleteProperty";
import {toast} from "react-toastify"

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId) => {
    const confirm = window.confirm("Are you sure you want to delete this property?");
    if (!confirm) return;

    try {
      await deleteProperty(propertyId);
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Failed to delete property:", error.message);
      alert("An error occurred while deleting the property. Please try again.");
    }
    toast.success("Property Deleted Successfully")
  };

  return (
    <div>
      {properties.map((property) => (
        <div key={property._id} className="mb-10">
          <Link href={`/properties/${property._id}`}>
            <Image
              className="h-32 w-full rounded-md object-cover"
              src={property.images[0]}
              alt={`Image of ${property.name}`}
              width={500}
              height={100}
              priority={true}
            />
          </Link>
          <div className="mt-2">
            <p className="text-lg font-semibold">{property.name}</p>
            <p className="text-gray-600">
              {property.location.street} {property.location.city}{" "}
              {property.location.state}
            </p>
          </div>
          <div className="mt-2 flex items-center">
            <Link
              href={`/properties/${property._id}/edit`}
              className="bg-purple-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-purple-600"
            >
              Edit
            </Link>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 text-xs rounded-md flex items-center"
              type="button"
              onClick={() => handleDeleteProperty(property._id)}
            >
              <Trash2 size={20} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileProperties;
