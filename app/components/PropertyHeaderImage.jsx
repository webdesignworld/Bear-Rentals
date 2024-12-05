import Image from "next/image";

const PropertyHeaderImage = ({image}) => {
        return (   <section>
                <div className="relative h-[400px] w-full">
    <Image
      src={`/images/properties/${image}`}
      alt="Property Image"
      className="object-cover"
      layout="fill" 
      sizes="100vw" 
    />
  </div>
              </section>);
}
 
export default PropertyHeaderImage;