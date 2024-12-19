// export function convertToSerializeableObject(leanDocument){

// for (const key of Object.keys(leanDocument)) {
//         if (leanDocument[key].toJSON && leanDocument[key].toString) {
//                 leanDocument[key] = leanDocument[key].toString();
//         }
// }
// return leanDocument;

// }

export function convertToSerializeableObject(leanDocument) {
        if (!leanDocument || typeof leanDocument !== "object") {
          return leanDocument; // Return primitive values as is
        }
      
        const serializedDocument = Array.isArray(leanDocument)
          ? [] // Handle arrays
          : {};
      
        for (const key of Object.keys(leanDocument)) {
          const value = leanDocument[key];
      
          // Check if the value is serializable using toString
          if (value && typeof value === "object" && value.toJSON && value.toString) {
            serializedDocument[key] = value.toString();
          } else if (typeof value === "object") {
            // Recursively process nested objects or arrays
            serializedDocument[key] = convertToSerializeableObject(value);
          } else {
            serializedDocument[key] = value; // Copy primitive values as is
          }
        }
      
        return serializedDocument;
      }
      