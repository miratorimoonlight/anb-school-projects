import { searchLocClient } from "./setup";
import uniqWith from "lodash.uniqwith";

export const fetchSearchLocResult = async (q) => {
  const res = await searchLocClient.get("/search", {
    method: "get",
    params: {
      q,
      addressdetails: 1,
    },
  });

  // { txt: "town, city, ...country", lat, lon}
  let resArr = res.map((each) => {
    const addrData = [];
    const addr = each.address;
    if (addr.town) addrData.push(addr.town);
    if (addr.city) addrData.push(addr.city);
    if (addr.province) addrData.push(addr.province);
    if (addr.state) addrData.push(addr.state);
    if (addr.country) addrData.push(addr.country);

    if (addrData.length == 0) addrData.push(each.name);

    return {
      txt: addrData.join(", "),
      lat: each.lat,
      lon: each.lon,
    };
  });

  // Remove duplicate results
  resArr = uniqWith(resArr, (a, b) => a.txt == b.txt);

  return resArr;
};
