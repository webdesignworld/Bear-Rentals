
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import connectDB from "../../config/database";
import Property from "../../models/Property";

const HomeProperties = async () => {
await connectDB();

// use property model to fetch from DB (fetch latest newest first, limit to three and lean for performance)
        const recentProperties = await Property.find({}).lean()
        .sort({createdAt: -1})
        .limit(3)
        .lean();

        return (          
        <>
        <section className="px-4 py-6 ">
                <div className="container-xl lg:container m-auto px-4 py-6">
                        <h2 className="text-3xl text-center font-bold text-black-500 mb-6">Recent Properties</h2>
                 

                  {recentProperties.length === 0 ? (
                    <p>No properties found</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {recentProperties.map((property, index) => (
                       <PropertyCard key={property._id} property={property}/>
                      ))}
                    </div>
                  )}
                </div>
              </section>

            
              
             {/* //  to load more properties when you click on the link button, sends to properties page */}
        
              <section className="m-auto max-w-lg my-6 px-6">

<Link href="/properties" className="block bg-sky-400 text-white text-center py-4 px-6 rounded-xl hover:bg-sky-500">View All Properties</Link>

              </section>
              
              </> 
              
        );
}
 
export default HomeProperties;