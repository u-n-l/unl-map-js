import { Record } from "../../api/records/models/Record";

export const venueRecordsList = (records: Record[]) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("mapbox-control-venues-list-root");
  wrapper.setAttribute("id", "grid-venues-list");

  const list = document.createElement("ul");
  list.setAttribute("id", "venues-list");
  list.classList.add("mapbox-control-venues-list-style");

  records.map((record) => {
    const option = document.createElement("li");
    option.classList.add("mapbox-control-venues-list-item");
    option.appendChild(
      document.createTextNode(
        record.geojson.properties.name[
          Object.keys(record.geojson.properties.name)[0]
        ]
      )
    );
    list.appendChild(option);
  });

  wrapper.appendChild(list);

  return wrapper;
};
